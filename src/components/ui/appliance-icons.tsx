import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export function DryerIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="3" y="2" width="18" height="20" rx="2" />
            <circle cx="12" cy="13" r="5" />
            <circle cx="12" cy="13" r="2" />
            <circle cx="7" cy="5" r="0.5" fill="currentColor" />
            <circle cx="9" cy="5" r="0.5" fill="currentColor" />
        </svg>
    )
}

export function WasherIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="3" y="2" width="18" height="20" rx="2" />
            <circle cx="12" cy="14" r="6" />
            <path d="M12 8v12" />
            <path d="M8 14h8" />
            <circle cx="7" cy="5" r="0.5" fill="currentColor" />
            <circle cx="9" cy="5" r="0.5" fill="currentColor" />
        </svg>
    )
}

export function RefrigeratorIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="5" y1="10" x2="19" y2="10" />
            <line x1="9" y1="5" x2="9" y2="8" />
            <line x1="9" y1="13" x2="9" y2="16" />
        </svg>
    )
}

export function OvenIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <rect x="7" y="10" width="10" height="8" rx="1" />
            <circle cx="8" cy="6" r="0.5" fill="currentColor" />
            <circle cx="12" cy="6" r="0.5" fill="currentColor" />
            <circle cx="16" cy="6" r="0.5" fill="currentColor" />
        </svg>
    )
}

export function StoveIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <circle cx="15" cy="9" r="2" />
            <circle cx="9" cy="15" r="2" />
            <circle cx="15" cy="15" r="2" />
        </svg>
    )
}

// Generic appliance icon for fallback
export function ApplianceIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6v6H9z" />
            <circle cx="7" cy="7" r="0.5" fill="currentColor" />
        </svg>
    )
}

// Helper to get icon by appliance type
export function getApplianceIcon(type: string) {
    switch (type.toLowerCase()) {
        case "dryer":
            return DryerIcon
        case "washer":
            return WasherIcon
        case "refrigerator":
            return RefrigeratorIcon
        case "oven":
            return OvenIcon
        case "stove":
            return StoveIcon
        default:
            return ApplianceIcon
    }
}
