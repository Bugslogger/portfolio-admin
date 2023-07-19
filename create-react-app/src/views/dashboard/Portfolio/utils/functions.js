import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";

/**
 *
 * @param {string} iconName
 * @returns
 */
export function ReactIcons(iconName) {
    if (typeof iconName !== "string") throw new Error("Argument must be string.");
    if (iconName.startsWith("Fa")) {
        return FaIcons[iconName];
    }
    if (iconName.startsWith("Io")) {
        return IoIcons[iconName];
    }
    if (iconName.startsWith("Md")) {
        return MdIcons[iconName];
    }
    if (iconName.startsWith("Ai")) {
        return AiIcons[iconName];
    }
    if (iconName.startsWith("Si")) {
        return SiIcons[iconName];
    }
    if (iconName.startsWith("Tb")) {
        return TbIcons[iconName];
    }
}
