// Card com efeito glassmorphism para uso em todo o sistema
export default function GlassCard({ children, className = '', hover = false }) {
    return (
        <div className={`
            bg-slate-800/40 backdrop-blur-md 
            border border-blue-900/30 
            shadow-xl rounded-lg 
            ${hover ? 'hover:bg-slate-800/60 hover:border-blue-700/50 transition-all duration-300' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
}
