/**
 * Copyright 2023 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clone, getValFromObjPath, getHexColor } from '../../utils';
import context from '../../globals/context';

/**
Given a character, return its ASCII value multiplied by its position.
 *
@param {string} char - The character to process.
@param {number} index - The position of the character in the string.
@returns {number} - The ASCII value of the character multiplied by its position.
 */
export const getCharacterValue = (char, index) => {
  return char.charCodeAt(0) * (index + 1);
};

/**
Given an object, return a sum of the ASCII values of all characters in its
JSON stringified representation, each multiplied by its position.
*
@param {object} obj - The object to process.
@returns {number} - The sum of ASCII values, each multiplied by its position.
*/
export const getCharacterSum = obj => {
  const str = JSON.stringify(obj);
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += getCharacterValue(str[i], i);
  }
  return sum;
};

/**
Given an object, return a "hash" of the object, which is a combination of
the length of its JSON stringified representation and the sum of the ASCII
values of all characters in that string, each multiplied by its position.
*
@param {object} obj - The object to process.
@returns {string} - The hash of the object.
*/
export const getHash = obj => {
  const str = JSON.stringify(obj);
  return str.length + '-' + getCharacterSum(obj);
};

export function executeWithContext(objOrFunction, theme) {
  if (typeof objOrFunction === 'function') {
    // If the input is a function, execute it with the context.theme as a parameter
    return objOrFunction(theme);
  } else if (typeof objOrFunction === 'object') {
    // If the input is an object, you can perform other operations here if needed.
    // For now, let's just return the input object.
    return objOrFunction;
  } else {
    return {};
  }
}
/**
 * Checks if a value is a plain object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a plain object, false otherwise.
 */
function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(value instanceof Function)
  );
}

/**
 * Returns the subTheme property of the first parent object that has one, or undefined if none exist.
 *
 * @param {object} obj - The object to search for a subTheme property.
 * @returns {(String | Undefined)} - The value of the subTheme property, or undefined if none exists.
 */
export const getSubTheme = obj => {
  if (obj.subTheme) return obj.subTheme;
  let parent = obj.p;
  while (parent && !parent.subTheme) {
    parent = parent.parent;
  }
  return parent && parent.subTheme;
};

/**
 * Returns the component configuration object for the given object based on its prototype chain.
 *
 * @param {object} obj - The object to get the component configuration for.
 * @returns {object} - The component configuration object.
 */
export const getComponentConfig = obj => {
  if (!isPlainObject(obj)) return {};

  const prototypeChain = getPrototypeChain(obj);
  if (!prototypeChain) {
    return obj?.theme?.componentConfig?.[obj.constructor.__componentName] || {};
  }

  return Array.from(prototypeChain)
    .reverse()
    .reduce((acc, curr) => {
      return clone(acc, obj?.theme?.componentConfig?.[curr] || {});
    }, {});
};

/**
 * Returns an array of the names of all components in the prototype chain of the given object.
 * @param {object} obj - The object to get the prototype chain from.
 * @returns {string[]} - An array of component names.
 */
export const getPrototypeChain = obj => {
  if (!isPlainObject(obj)) return [];
  const prototypeChain = new Set();
  let proto = obj;

  /**
   * Traverse the prototype chain and add component names to the set
   */
  do {
    proto = Object.getPrototypeOf(proto);

    if (proto !== null && typeof proto === 'object') {
      // Add only components that support theming
      if (proto.constructor.__componentName) {
        prototypeChain.add(proto.constructor.__componentName);
      }
    }
  } while (proto);

  // Convert the set to an array and return it
  return Array.from(prototypeChain);
};

/**
 * Recursively removes empty objects from the provided object.
 *
 * @param {object} obj - The object from which to remove empty objects.
 * @returns {object} - The object with empty objects removed.
 */
function removeEmptyObjects(obj) {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === 'object' &&
      obj[key] !== null
    ) {
      removeEmptyObjects(obj[key]);

      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }

  if (Object.keys(obj).length === 0) {
    return; // Exit if the current object is empty
  }
  return obj;
}

export function styleFormatter(obj, target, search) {
  // Check if obj is an object and not null
  if (obj === null || typeof obj !== 'object') {
    return [];
  }

  // Check if target is a string
  if (typeof target !== 'string') {
    return [];
  }

  // Check if search is a string
  if (typeof search !== 'string') {
    return [];
  }

  // Attempt to find the property of 'target' in obj
  if (obj.hasOwnProperty(target)) {
    const targetObj = obj[target];

    // Check if targetObj is an object, not null, and has keys
    if (
      targetObj !== null &&
      typeof targetObj === 'object' &&
      Object.keys(targetObj).length > 0
    ) {
      // Check each value in targetObj
      for (const key in targetObj) {
        if (targetObj.hasOwnProperty(key)) {
          const value = targetObj[key];

          // Check if the value is an object that has a key of search
          if (
            typeof value === 'object' &&
            value !== null &&
            value.hasOwnProperty(search)
          ) {
            const nestedObj = value[search];

            // Check if the nestedObj is an object that also has keys
            if (
              typeof nestedObj === 'object' &&
              Object.keys(nestedObj).length > 0
            ) {
              return [nestedObj, `${target}.${key}.${search}`];
            }
          }
        }
      }
    }
  }
  return [];
}

/**
 * Finds unique property names nested under a specified sub-property within an object.
 * @param {object} obj - The object to search.
 * @param {string} subPropertyName - The sub-property name to search for.
 * @returns {string[]} - An array of unique property names found.
 */
const findPropertiesBySubProperty = (obj, subPropertyName) => {
  // Initialize a Set to store unique property names
  const result = new Set();

  /**
   * Recursively traverses the object and extracts property names under the specified sub-property.
   * @param {object} obj - The object to traverse.
   */
  function traverse(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          // If the current key matches the specified sub-property
          if (key === subPropertyName) {
            // Loop through the sub-object's keys and add them to the result set
            for (const subKey in obj[key]) {
              if (obj[key].hasOwnProperty(subKey)) {
                result.add(subKey);
              }
            }
          }
          // Continue recursive traversal
          traverse(obj[key]);
        }
      }
    }
  }

  // Start traversing the object
  traverse(obj);

  // Convert the Set to an array and return
  return Array.from(result);
};

/**
 * Generates the source style object for a given component by merging base, mode, and tone styles from the component's style chain
 * @param {object} component - The component for which to generate the style source
 * @returns {object} - The source style object for the component
 */
export const generateComponentStyleSource = component => {
  // Initialize the finalStyle object to an empty object
  let finalStyle = {};
  const theme = component.theme;
  // Check if the provided component is a plain object
  if (!isPlainObject(component)) {
    return {};
  }

  // Get the styleChain for the component
  const styleChain = getStyleChainMemoized(component);

  // Process all styles in styleChain
  styleChain.forEach(({ style }) => {
    // Check if the style object does not have specific keys (base, mode, tone, default)
    if (
      typeof style === 'object' &&
      !style.base &&
      !style.mode &&
      !style.tone &&
      !style.default
    ) {
      // Merge the style as a base style
      finalStyle = clone(finalStyle, { base: style });
    } else {
      const { base, mode, tone } = style;
      // Apply the style at different levels (Base Level: Component Style File)
      finalStyle = clone(finalStyle, { base: executeWithContext(base, theme) });
      finalStyle = clone(finalStyle, { tone: executeWithContext(tone, theme) });
      finalStyle = clone(finalStyle, { mode: executeWithContext(mode, theme) });
    }
  });

  // Apply Theme Level styles from ComponentConfig
  if (component._componentConfig) {
    if (component._componentConfig.styleConfig) {
      context.info(
        'style config is deprecated. Please use style = { base: {}, tone: {}, mode: {} }'
      );
      finalStyle = clone(finalStyle, component._componentConfig.styleConfig);
    }

    const componentConfigStyle = component._componentConfig.style;

    if (componentConfigStyle?.base) {
      finalStyle = clone(finalStyle, {
        base: componentConfigStyle.base
      });
    }

    if (componentConfigStyle) {
      const overwrite = JSON.parse(JSON.stringify(componentConfigStyle));
      delete overwrite.base;
      delete overwrite.tone;
      delete overwrite.mode;
      finalStyle = clone(finalStyle, { overwrite }); // Anything in the root level of style
    }

    if (componentConfigStyle?.tone) {
      finalStyle = clone(finalStyle, {
        tone: componentConfigStyle.tone
      });
    }

    if (componentConfigStyle?.mode) {
      finalStyle = clone(finalStyle, {
        mode: componentConfigStyle.mode
      });
    }
  }

  // Apply Component Level styles
  if (component._componentLevelStyle) {
    if (component._componentLevelStyle.styleConfig) {
      finalStyle = clone(
        finalStyle,
        component._componentLevelStyle.styleConfig
      );
    }

    const componentStyle = component._componentLevelStyle;

    if (componentStyle) {
      const overwrite = JSON.parse(JSON.stringify(componentStyle));
      delete overwrite.base;
      delete overwrite.tone;
      delete overwrite.mode;
      finalStyle = clone(finalStyle, {
        overwrite
      });
    }

    if (componentStyle?.base) {
      finalStyle = clone(finalStyle, {
        base: componentStyle.base
      });
    }

    if (componentStyle?.tone) {
      finalStyle = clone(finalStyle, {
        tone: componentStyle.tone
      });
    }

    if (componentStyle?.mode) {
      finalStyle = clone(finalStyle, {
        mode: componentStyle.mode
      });
    }
  }

  // Destructure the finalStyle object
  const { base = {}, mode = {}, tone = {}, overwrite = {} } = finalStyle;

  // Create the solution object to store the processed styles
  const solution = {};
  const toneProperties = findPropertiesBySubProperty(mode, 'tone');
  const modeProperties = findPropertiesBySubProperty(tone, 'mode');

  // Iterate through modes and tones to generate styles
  for (const modeItem of [
    ...new Set(['unfocused', ...Object.keys(mode), ...modeProperties])
  ]) {
    for (const toneItem of [
      ...new Set(['neutral', ...Object.keys(tone), ...toneProperties])
    ]) {
      let payload = clone(base, tone[toneItem]);
      payload = clone(payload, overwrite);
      payload = clone(payload, tone[toneItem]?.mode?.[modeItem] || {});
      payload = clone(payload, mode[modeItem]);
      solution[modeItem + '_' + toneItem] = clone(
        payload,
        mode[modeItem]?.tone?.[toneItem] || {}
      );
    }
  }

  // Return the final processed style object

  return formatStyleObj(
    removeEmptyObjects(colorParser(component, solution)) || {},
    component.constructor.aliasStyles
  );
};

/**
 * Parse and process a style object to replace theme strings and process color arrays.
 * @param {string} component - Lightning Component
 * @param {object} styleObj - The input style object to be processed.
 * @returns {object} The processed style object with theme strings replaced and color arrays processed.
 */
export const colorParser = (component, styleObj) => {
  // Process style object and remove unnecessary properties
  const processedStyle = JSON.stringify(styleObj, (_, value) => {
    if (-1 < ['tone', 'mode'].indexOf(_)) return undefined; // Remove any tone/mode or mode/tone properties as they have already been processed
    if ('string' === typeof value && value.startsWith('theme.')) {
      // Support theme strings example: theme.radius.md
      return getValFromObjPath(component, value); // If no theme value exists, the property will be removed from the object
    } else if (Array.isArray(value) && value.length === 2) {
      // Process value as a color ['#663399', 1]
      return getHexColor(value[0], value[1]);
    }
    return value;
  });
  return JSON.parse(processedStyle || {});
};

/**
 * Generates the final style object for a component using its style source.
 * @param {object} component - The component for which to generate a style object.
 * @param {object} componentStyleSource - The style source object for the component.
 * @returns {object} - The generated style object.
 */
export const generateStyle = (component, componentStyleSource = {}) => {
  if (!isPlainObject(component)) return {};
  // if (component.constructor.name === 'Button') debugger
  const { mode = 'unfocused', tone = 'neutral' } = component;

  const style =
    componentStyleSource[`${mode}_${tone}`] ||
    componentStyleSource[`unfocused_${tone}`] ||
    componentStyleSource['unfocused_neutral'] ||
    {};

  const componentStyle = component._componentLevelStyle;
  if (componentStyle) {
    return clone(style, colorParser(component, componentStyle));
  }
  return formatStyleObj(style, component.constructor.aliasStyles);
};

/**
 * Generates a name by concatenating the names of constructors in the prototype chain.
 * @param {object} obj - The object for which to generate the name.
 * @returns {string} - The generated name.
 */
function generateNameFromPrototypeChain(obj) {
  // Base case: If the object has no prototype or its prototype is null, return its own constructor name (if available).
  if (!Object.getPrototypeOf(obj)) {
    return obj.constructor?.name || '';
  }

  // Recursive step: Get the constructor name of the current object and concatenate it with the name generated from the prototype.
  const currentName = obj.constructor?.name || '';
  const parentName = generateNameFromPrototypeChain(Object.getPrototypeOf(obj));

  // Concatenate the names in reverse order (from the top of the prototype chain to the bottom).
  return parentName ? `${parentName}.${currentName}` : currentName;
}

/**
 * Creates a cache object to store the results of getStyleChainMemoized function calls.
 * @type {object}
 */
const styleChainCache = {};

/**
 * Memoized version of getStyleChain function. Retrieves the style chain for a component by traversing its prototype chain.
 * @param {object} componentObj - The component object to get the style chain from.
 * @returns {{ style: (object | function) }[]} - An array of style objects containing either an object of styles or a function to return an object of styles.
 */
export const getStyleChainMemoized = componentObj => {
  /**
   * Create a cache key based on the stringified component object.
   * @type {string}
   */

  const cacheKey = generateNameFromPrototypeChain(componentObj);
  // Check if the result is already in the cache
  if (styleChainCache[cacheKey]) {
    return styleChainCache[cacheKey];
  }

  /**
   * Compute the style chain using the getStyleChain function.
   * @type {{ style: (object | function) }[]}
   */
  const styleChain = getStyleChain(componentObj);

  // Cache the result for future use
  styleChainCache[cacheKey] = styleChain;

  // Return the style chain
  return styleChain;
};

/**
 * Traverse up the prototype chain to create an array of all the styles that are present in the Components ancestors
 * @param {object} componentObj - The component object to get the style chain from.
 * @returns {{ style: (object | function) }[]} - An array of style objects containing either an object of styles or a function to return an object of styles.
 */
export const getStyleChain = componentObj => {
  const styleSet = new Set();
  let proto = componentObj;

  do {
    proto = Object.getPrototypeOf(proto);

    if (proto && proto.constructor) {
      // Check if style was passed in as param in .map(style => {to mixin withThemeStyles(MyComponent, {foo: 'bar'})

      if (
        proto.constructor.__mixinStyle &&
        !styleSet.has(proto.constructor.__mixinStyle)
      ) {
        if (
          typeof proto.constructor.__mixinStyle === 'object' &&
          Object.keys(proto.constructor.__mixinStyle).length
        ) {
          styleSet.add(proto.constructor.__mixinStyle);
        } else if (typeof proto.constructor.__mixinStyle === 'function') {
          styleSet.add(proto.constructor.__mixinStyle);
        }
      }

      // Check if has __themeStyle set
      if (
        proto.constructor.__themeStyle &&
        !styleSet.has(proto.constructor.__themeStyle)
      ) {
        if (
          typeof proto.constructor.__themeStyle === 'object' &&
          Object.keys(proto.constructor.__themeStyle).length
        ) {
          styleSet.add(proto.constructor.__themeStyle);
        } else if (typeof proto.constructor.__themeStyle === 'function') {
          styleSet.add(proto.constructor.__themeStyle);
        }
      }
    }
  } while (proto);

  // Return an array of style objects
  return Array.from(styleSet)
    .map(style => ({
      style
    }))
    .reverse();
};

/**
 * Formats a style object by applying a series of formatter functions.
 *
 * @param {object} originalObj - The original style object to be formatted.
 * @param {array} [aliasStyles=[]] - An array of alias styles to be used during formatting.
 * @returns {object} The formatted style object after applying all formatter functions.
 */
export const formatStyleObj = (originalObj, aliasStyles = []) => {
  const formatters = new Set();

  // Adding a key-value pair to the 'formatters' Set.
  // This pattern is used so more formatters can be easily added if required at a later time
  formatters.add([replaceAliasValues, [aliasStyles]]);

  // Generating an array from the 'formatters' Set
  const formattersArray = Array.from(formatters);

  // Using reduce to apply functions from 'formattersArray' to 'finalStyle'
  // Each function takes 'obj' (initially 'finalStyle') as input and applies transformations
  // The result of the previous function is passed as input to the next function
  // The final transformed style is assigned to 'this._style'
  return formattersArray.reduce(
    (obj, [func, args]) => func(obj, ...args),
    originalObj
  );
};

/**
 * Replaces alias values in the provided style object with their corresponding aliases.
 * @param {object} value - The style object to process.
 * @param {Array<Object>} [aliasStyles=[]] - Optional array of alias styles to apply.
 * @returns {object} The style object with alias values replaced.
 */
export const replaceAliasValues = (value, aliasStyles = []) => {
  let str = JSON.stringify(value);
  const aliasProps = [
    { prev: 'height', curr: 'h', skipWarn: true },
    { prev: 'width', curr: 'w', skipWarn: true },
    ...(aliasStyles || [])
  ];
  aliasProps.forEach(alias => {
    if (
      alias &&
      typeof alias.prev === 'string' &&
      typeof alias.curr === 'string'
    ) {
      !alias.skipWarn &&
        str.search(`"${alias.prev}":`) >= 0 &&
        console.warn(
          `The style property "${alias.prev}" is deprecated and will be removed in a future release. Please use "${alias.curr}" instead.`
        );
      str = str.replaceAll(`"${alias.prev}":`, `"${alias.curr}":`);
    }
  });
  return JSON.parse(str);
};