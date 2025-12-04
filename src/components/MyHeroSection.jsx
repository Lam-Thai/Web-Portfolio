import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getHero } from "@/lib/db";

export default async function MyHero() {
  const hero = await getHero();

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={hero.avatar}
              alt={hero.fullName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex-1">
          <CardHeader>
            <h1 className="text-4xl font-bold">{hero.fullName}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              {hero.shortDescription}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 leading-relaxed">
              {hero.longDescription}
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
