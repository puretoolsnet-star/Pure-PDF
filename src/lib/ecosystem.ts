export type EcosystemProjectId =
  | "purepdf"
  | "pureConvert"
  | "pureQr"
  | "pureSign"
  | "pureTable"
  | "pureImage"
  | "pureText";

export type EcosystemProjectStatus = "active" | "comingSoon";

export type EcosystemProjectMeta = {
  id: EcosystemProjectId;
  status: EcosystemProjectStatus;
  /** In-app path (locale prefix added by Link / router). */
  href?: string;
  /** If set, project opens on another origin with `/{locale}` appended. */
  external?:
    | "pureConvert"
    | "pureQr"
    | "pureSign"
    | "pureTable"
    | "pureImage"
    | "pureText";
};

/**
 * Order: PurePDF → PureConvert → PureQR → PureSign → PureTable → PureImage → PureText.
 */
export const ECOSYSTEM_PROJECTS: EcosystemProjectMeta[] = [
  { id: "purepdf", status: "active", href: "/" },
  { id: "pureConvert", status: "active", external: "pureConvert" },
  { id: "pureQr", status: "active", external: "pureQr" },
  { id: "pureSign", status: "active", external: "pureSign" },
  { id: "pureTable", status: "active", external: "pureTable" },
  { id: "pureImage", status: "active", external: "pureImage" },
  { id: "pureText", status: "active", external: "pureText" },
];
