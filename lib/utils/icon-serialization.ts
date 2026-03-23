/**
 * Utility functions for converting React icon components to string names
 * for serialization when passing from Server Components to Client Components
 */

import * as React from "react";
import {
  Users,
  Building2,
  Target,
  Clock,
  Phone,
  MapPin,
  Mail,
  Home,
  Briefcase,
  Award,
  User,
  TrendingUp,
  FileText,
  Scale,
  Building,
  Banknote,
  BarChart3,
  LampDesk,
  Lightbulb,
  Recycle,
  Rocket,
  Microscope,
  Handshake,
  CheckCircle,
  Shield,
} from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

// Map icon components to their string names
const iconComponentToName: Map<IconComponent, string> = new Map([
  [Users, "Users"],
  [Building2, "Building2"],
  [Target, "Target"],
  [Clock, "Clock"],
  [Phone, "Phone"],
  [MapPin, "MapPin"],
  [Mail, "Mail"],
  [Home, "Home"],
  [Briefcase, "Briefcase"],
  [Award, "Award"],
  [User, "User"],
  [TrendingUp, "TrendingUp"],
  [FileText, "FileText"],
  [Scale, "Scale"],
  [Building, "Building"],
  [Banknote, "Banknote"],
  [BarChart3, "BarChart3"],
  [LampDesk, "LampDesk"],
  [Lightbulb, "Lightbulb"],
  [Recycle, "Recycle"],
  [Rocket, "Rocket"],
  [Microscope, "Microscope"],
  [Handshake, "Handshake"],
  [CheckCircle, "CheckCircle"],
  [Shield, "Shield"],
]);

/**
 * Converts an icon component to its string name
 */
export function iconToName(icon: IconComponent | string | undefined): string {
  if (!icon) return "";
  if (typeof icon === "string") return icon;
  return iconComponentToName.get(icon) || "";
}

/**
 * Converts a Service object with icon component to one with icon string
 */
export function serializeService<T extends { icon: IconComponent }>(
  service: T
): Omit<T, "icon"> & { icon: string } {
  return {
    ...service,
    icon: iconToName(service.icon),
  };
}

/**
 * Converts an array of Service objects with icon components to ones with icon strings
 */
export function serializeServices<T extends { icon: IconComponent }>(
  services: T[]
): Array<Omit<T, "icon"> & { icon: string }> {
  return services.map(serializeService);
}

/**
 * Generic function to serialize any object with an icon property
 */
export function serializeWithIcon<T extends { icon: IconComponent }>(
  item: T
): Omit<T, "icon"> & { icon: string } {
  return serializeService(item);
}

/**
 * Generic function to serialize an array of objects with icon properties
 */
export function serializeArrayWithIcon<T extends { icon: IconComponent }>(
  items: T[]
): Array<Omit<T, "icon"> & { icon: string }> {
  return items.map(serializeWithIcon);
}
