import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import GoogleSignInButton from "@/features/auth/components/login/google-sign-in-button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth.login");
  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      <FieldGroup className="flex flex-col items-center gap-2 text-center">
        <a
          href="https://tomosia.com/"
          className="flex flex-col items-center gap-2 font-medium"
        >
          <Image
            src={"/logo.webp"}
            alt={"Tomosia logo"}
            width={46}
            height={46}
          />
        </a>
        <h1 className="text-xl font-bold uppercase">{t("title")}</h1>
        <Field className="px-6 text-center">{t("appName")}</Field>
      </FieldGroup>
      <Field>
        <GoogleSignInButton />
      </Field>
      <FieldDescription className="px-6 text-center">
        {t.rich("tos.fullText", {
          tosLink: (chunks) => <a href="#">{chunks}</a>,
          privacyLink: (chunks) => <a href="#">{chunks}</a>,
        })}
      </FieldDescription>
    </div>
  );
}
