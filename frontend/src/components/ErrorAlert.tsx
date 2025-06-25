interface Props {
    message: string;
    className?: string;
  }
  
  export default function ErrorAlert({ message, className = '' }: Props) {
    return (
      <div className={`bg-red-100 text-red-700 p-4 rounded my-4 max-w-md mx-auto ${className}`}>
        {message}
      </div>
    )
  }
  