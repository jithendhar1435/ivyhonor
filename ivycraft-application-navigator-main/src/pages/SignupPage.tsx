
import SignupForm from "@/components/auth/SignupForm";
import PublicLayout from "@/components/layout/PublicLayout";

const SignupPage = () => {
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-220px)] bg-slate-50 py-12">
        <SignupForm />
      </div>
    </PublicLayout>
  );
};

export default SignupPage;
