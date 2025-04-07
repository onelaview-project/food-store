import LoadingImg from "../../assets/loading.gif";

const Loading: React.FC<React.ButtonHTMLAttributes<HTMLImageElement>> = (
  props,
) => {
  return <img {...props} src={LoadingImg} />;
};

export default Loading;
