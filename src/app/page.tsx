import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl  text-zinc-800">Hello World!</h1>
      <div className="flex gap-2">
        <Input placeholder="Isso é um input..." className="w-fit" />
        <Button className="bg-zinc-800 text-zinc-100 w-fit">Button</Button>
      </div>
    </div>
  );
}
