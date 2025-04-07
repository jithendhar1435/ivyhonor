
import LoginForm from "@/components/auth/LoginForm";
import PublicLayout from "@/components/layout/PublicLayout";

const LoginPage = () => {
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-220px)] bg-slate-50 py-12">
        <LoginForm />
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
