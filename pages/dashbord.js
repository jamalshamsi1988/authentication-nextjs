import { verifyToken } from "../utils/auth";

const dashbord = () => {
  return <div>Dashbord</div>;
};

export default dashbord;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  const secretKey = process.env.SECRET_KEY;
  const result = verifyToken(token, secretKey);

  if (!result) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { result },
  };
}
