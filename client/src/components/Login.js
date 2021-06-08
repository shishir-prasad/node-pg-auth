import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="flex min-w-1/3 p-16 m-auto bg-gray-300 justify-around">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading text-5xl mx-auto">Login</h1>
        <input
          className="w-80 p-4 m-4"
          {...register('email')}
          placeholder="Enter your email"
          name="email"
        />
        {errors.email && <span className="is-danger">{errors.email.message}</span>}
        <input
          className="w-80 p-4 m-4"
          {...register('password')}
          placeholder="Enter Password"
          name="password"
        />
        {errors.password && <span className="is-danger">{errors.password.message}</span>}
        <input className="inline-block p-4 m-4" type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Login;
