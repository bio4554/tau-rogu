const Login = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    console.log(`username: ${username} \npassword: ${password}`);
  };

  return (
    <div>
      <h1>Login page</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username"></input>
        </label>
        <div />
        <label>
          Password: <input name="password"></input>
        </label>
        <hr />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
