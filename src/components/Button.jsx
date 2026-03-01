export default function Button({ className = "", children, ...props }) {
    return (
        <button
            {...props}
            className={[
                            "flex items-center justify-center gap-2 px-8 py-3 rounded-full",
                "font-bold md:text-lg tracking-wide uppercase text-xs",
                
                "shadow-lg shadow-pink-200/20 backdrop-blur-sm",
                "border border-white/40",
                
                
                "tr// Interactive Animationsansition-all duration-300 ease-out",
                "hover:scale-105 hover:shadow-xl hover:-translate-y-0.5",
                "active:scale-95 active:translate-y-0",
                "will-change-transform cursor-pointer",
                
             
                "focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2",
                
                className,
            ].join(" ")}
        >
            {children}
        </button>
    )
}