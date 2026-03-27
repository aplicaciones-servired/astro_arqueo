interface ButtonProps {
  children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className,
    disabled,
    type,
}) => {
    return (
        <button
            className={`btn-primary ${className ?? ""}`.trim()}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;