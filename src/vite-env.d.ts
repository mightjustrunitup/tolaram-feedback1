
/// <reference types="vite/client" />

// Declare CSS module types
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare image module types
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
