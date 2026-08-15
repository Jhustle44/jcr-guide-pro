import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface VersionInfo {
  version: string;
  name: string;
  build: string;
  features: string[];
  changelog: Record<string, {
    date: string;
    changes: string[];
  }>;
}

export function VersionInfo() {
  const [versionData, setVersionData] = useState<VersionInfo | null>(null);

  useEffect(() => {
    fetch('/version.json')
      .then(res => res.json())
      .then(setVersionData)
      .catch(console.error);
  }, []);

  if (!versionData) return null;

  const latestVersion = Object.keys(versionData.changelog)[0];
  const latestChangelog = versionData.changelog[latestVersion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {versionData.name}
          </CardTitle>
          <Badge variant="default" className="text-sm">
            v{versionData.version}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Build: {versionData.build}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Features */}
        <div>
          <h3 className="font-medium mb-3">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {versionData.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <i className="material-icons text-primary-600 text-sm mr-2">check_circle</i>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Latest Release Notes */}
        <div>
          <h3 className="font-medium mb-3">
            Release Notes - v{latestVersion}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Released: {latestChangelog.date}
          </p>
          <ul className="space-y-2">
            {latestChangelog.changes.map((change, index) => (
              <li key={index} className="flex items-start text-sm">
                <i className="material-icons text-green-600 text-sm mr-2 mt-0.5">
                  new_releases
                </i>
                {change}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}