import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DeviceComponent } from "@shared/schema";

interface PartsIdentificationProps {
  deviceType: string;
}

export default function PartsIdentification({ deviceType }: PartsIdentificationProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const { data: components = [] } = useQuery<DeviceComponent[]>({
    queryKey: ["/api/device-components", deviceType],
    queryFn: () => {
      const params = new URLSearchParams();
      if (deviceType) params.append('deviceType', deviceType);
      return fetch(`/api/device-components?${params}`).then(res => res.json());
    },
  });

  const componentColors = [
    { name: "RAM/Memory", color: "bg-success-600" },
    { name: "Storage Drive", color: "bg-warning-700" },
    { name: "Cooling System", color: "bg-cyan-600" },
    { name: "Battery", color: "bg-purple-600" },
    { name: "Motherboard", color: "bg-primary-700" },
  ];

  const getComponentColor = (name: string) => {
    const component = componentColors.find(c => name.includes(c.name.split('/')[0]));
    return component?.color || "bg-gray-600";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-material p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Parts Identification Guide</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Click on components to learn more about them</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src="https://pixabay.com/get/g47f3243ed959354ccf54e02cc790eae822f47a5a3e5222dbc4d9becb7bacd50952bf4d9c647072182a34403929751facc95c030ab418c2af1194144c6770113f_1280.jpg"
            alt="Laptop internal components layout"
            className="w-full rounded-lg"
          />

          {/* Interactive hotspots */}
          <button
            onClick={() => setSelectedComponent("ram")}
            className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary-700 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
            title="RAM/Memory"
          >
            <span className="sr-only">RAM Module</span>
          </button>
          <button
            onClick={() => setSelectedComponent("storage")}
            className="absolute top-1/2 left-1/4 w-6 h-6 bg-primary-700 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
            title="Storage Drive"
          >
            <span className="sr-only">Storage Drive</span>
          </button>
          <button
            onClick={() => setSelectedComponent("cooling")}
            className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary-700 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
            title="Cooling System"
          >
            <span className="sr-only">Cooling Fan</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Common Components</h3>
            <div className="space-y-2">
              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  className={`flex items-center space-x-3 p-2 w-full rounded cursor-pointer transition-colors ${
                    selectedComponent === component.id ? "bg-primary-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${getComponentColor(component.name)}`}></div>
                  <span className="text-sm">{component.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedComponent && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Component Details</h4>
              {(() => {
                const component = components.find(c => c.id === selectedComponent);
                if (component) {
                  return (
                    <>
                      <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                      {component.safetyNotes.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <h5 className="font-medium text-yellow-800 mb-1">Safety Notes</h5>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            {component.safetyNotes.map((note, index) => (
                              <li key={index}>• {note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  );
                }
                return <p className="text-sm text-gray-500">Select a component to view details.</p>;
              })()}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <i className="material-icons text-primary-700 text-lg mt-0.5">info</i>
              <div>
                <h4 className="font-medium text-primary-900 mb-1">Pro Tip</h4>
                <p className="text-sm text-primary-800">
                  Always power down and disconnect the battery before working on internal components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
