declare module '*.png';
declare module '*.webp';
declare module '*.svg?react' {
    import React = require('react');
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
declare module '*.svg' {
    const src: string;
    export default src;
}
