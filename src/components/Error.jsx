export default function Error({message, className=""}) {
    return message ? <p className={"error " + className}>{message}</p> : null
}