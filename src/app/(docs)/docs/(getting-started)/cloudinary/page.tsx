export default function CloudinaryPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Cloudinary setup</h1>
          <p className="text-sm text-muted-foreground">
            Guide to connect the template to Cloudinary for media uploads (images,
            video, audio) and how to configure an upload preset and environment
            variables.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">1. Create a Cloudinary account</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Sign up at cloudinary.com and create a new media library.</li>
            <li>From the dashboard, note your <span className="font-medium">cloud name</span>, <span className="font-medium">API key</span>, and <span className="font-medium">API secret</span>.</li>
            <li>Create an <span className="font-medium">unsigned upload preset</span> if you want client-side uploads without exposing your API secret.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">2. Environment variables</h2>
          <p className="text-sm text-muted-foreground">
            Add Cloudinary credentials to your <code className="rounded bg-muted px-1 py-0.5">.env.local</code> file. This project expects these variables (see <code className="rounded bg-muted px-1 py-0.5">.env.example</code>):
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            <code>{`// .env.local (example)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_IMAGE_PRESET=unsigned_image_preset
NEXT_PUBLIC_CLOUDINARY_VIDEO_PRESET=unsigned_video_preset
NEXT_PUBLIC_CLOUDINARY_FILE_PRESET=unsigned_file_preset
`}</code>
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">3. SDK initialization</h2>
          <p className="text-sm text-muted-foreground">
            This project uses a small config wrapper at <code className="rounded bg-muted px-1 py-0.5">src/lib/cloudinary.config.ts</code> which exposes the Cloudinary
            cloud name, base upload URL and the preset names. The client-side upload helper lives in <code className="rounded bg-muted px-1 py-0.5">src/features/chat/services/cloudinary.service.ts</code>
            and performs a direct POST to Cloudinary using the unsigned presets and the folder conventions defined in the config.
          </p>
          <p className="text-xs text-muted-foreground">
            Example config (already present in the repo): <code className="rounded bg-muted px-1 py-0.5">src/lib/cloudinary.config.ts</code> exports a <code className="rounded bg-muted px-1 py-0.5">CLOUDINARY_CONFIG</code> object containing <code className="rounded bg-muted px-1 py-0.5">baseUrl</code>, <code className="rounded bg-muted px-1 py-0.5">presets</code> and <code className="rounded bg-muted px-1 py-0.5">folders</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">4. Example upload service (server)</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
            <code>{`// src/features/chat/services/cloudinary.service.ts (client-side helper)
import { CLOUDINARY_CONFIG } from '@/lib/cloudinary.config';

// Example POST done in the project using FormData to:
// \${CLOUDINARY_CONFIG.baseUrl}/{resourceType}/upload
// The repo exposes helpers: uploadImage(file, roomId), uploadVideo(file, roomId), uploadFile(file, roomId)
`}</code>
          </pre>
          <p className="text-xs text-muted-foreground">
            Store the returned URL and a small <code className="rounded bg-muted px-1 py-0.5">media.type</code> on the message document.
          </p>
        </section>
      </main>
    </div>
  );
}
