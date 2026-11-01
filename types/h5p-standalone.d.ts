declare module 'h5p-standalone' {
  export interface H5POptions {
    h5pJsonPath?: string;
    contentJsonPath?: string;
    librariesPath?: string;
    frameJs?: string;
    frameCss?: string;
    frame?: boolean;
    copyright?: boolean;
    export?: boolean;
    icon?: boolean;
    downloadUrl?: string;
    fullScreen?: boolean;
    embed?: boolean;
    embedCode?: string;
    customCss?: string[];
    customJs?: string[];
    xAPIObjectIRI?: string;
    preventH5PInit?: boolean;
    contentId?: string;
  }

  export class H5P {
    constructor(container: HTMLElement, options: H5POptions);
    dispose?(): void;
  }
}
