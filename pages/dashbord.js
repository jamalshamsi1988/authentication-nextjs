import { useState } from "react";
import { verifyToken } from "../utils/auth";

const dashbord = ({ result }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <h1>Dashbord</h1>
      <h3>Your Email Is :{result.email}</h3>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitHandler}> Submit </button>
      <h5>Your profile</h5>
      <p>Name : {result.name}</p>
      <p>Last Name : {result.lastName}</p>
    </div>
  );
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
