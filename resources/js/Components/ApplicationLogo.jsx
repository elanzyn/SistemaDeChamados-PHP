// Logo SVG de headset azul, coerente com o sistema
export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <circle cx="32" cy="32" r="30" fill="#1e40af" />
            <path d="M16 40V32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32V40" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
            <rect x="12" y="38" width="8" height="12" rx="4" fill="#1e40af" stroke="#fff" strokeWidth="2"/>
            <rect x="44" y="38" width="8" height="12" rx="4" fill="#1e40af" stroke="#fff" strokeWidth="2"/>
            <rect x="24" y="44" width="16" height="6" rx="3" fill="#fff"/>
        </svg>
    );
}

