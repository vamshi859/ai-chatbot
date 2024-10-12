import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
}

const NavigationLink = (props: Props) => {
    const {
        to,
        text,
        bg,
        textColor
    } = props;

  return (
    <Link to={to} className="nav-link" style={{
        background: bg,
        color: textColor
    }}>{text}</Link>
  )
}

export default NavigationLink