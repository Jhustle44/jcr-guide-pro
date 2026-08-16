import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { TroubleshootingFlow } from "@shared/schema";

interface TroubleshootingFlowchartProps {
  selectedFlow?: TroubleshootingFlow;
}

export default function TroubleshootingFlowchart({ selectedFlow }: TroubleshootingFlowchartProps) {
  const [, setLocation] = useLocation();
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);

  const { data: flows = [] } = useQuery<TroubleshootingFlow[]>({
    queryKey: ["/api/troubleshooting-flows"],
  });

  const troubleshootingTypes = [
    {
      id: "power",
      title: "Device Won't Turn On",
      description: "Power issues, dead battery, charging problems",
      icon: "power_off",
      color: "text-danger-500",
    },
    {
      id: "performance",
      title: "Slow Performance",
      description: "Freezing, overheating, software issues",
      icon: "speed",
      color: "text-warning-500",
    },
    {
      id: "display",
      title: "Display Problems",
      description: "Screen flickering, no display, broken LCD",
      icon: "monitor",
      color: "text-primary",
    },
  ];

  const handleStartTroubleshooting = (type: string) => {
    const flow = flows.find(f => f.type === type);
    if (flow) {
      setCurrentStepId(flow.steps[0]?.id || null);
      setSolution(null);
      setLocation(`/troubleshooting/${type}`);
    }
  };

  const handleAnswer = (answer: { text: string; nextStepId?: string; solutionId?: string }) => {
    if (answer.nextStepId) {
      setCurrentStepId(answer.nextStepId);
    } else if (answer.solutionId) {
      setSolution(answer.solutionId);
      setCurrentStepId(null);
    }
  };

  const reset = () => {
    setCurrentStepId(null);
    setSolution(null);
  };

  if (selectedFlow && (currentStepId || solution)) {
    const currentStep = selectedFlow.steps.find(s => s.id === currentStepId);

    return (
      <div className="bg-white rounded-xl shadow-material p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">{selectedFlow.title}</h2>
          <Button variant="outline" onClick={reset}>
            Start Over
          </Button>
        </div>

        {solution ? (
          <div className="text-center py-8">
            <div className="text-green-500 mb-4">
              <i className="material-icons text-6xl">check_circle</i>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Diagnosis Complete</h3>
            <p className="text-gray-600 mb-6">Recommended solution: {solution}</p>
            <div className="space-y-2">
              <Button onClick={reset} className="mr-4">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => setLocation("/")}>
                Browse Repair Guides
              </Button>
            </div>
          </div>
        ) : currentStep ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{currentStep.question}</h3>
              <div className="space-y-3">
                {currentStep.answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(answer)}
                    className="w-full justify-start p-4 h-auto text-left"
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-material p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Troubleshooting</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Start here if you're not sure what's wrong with your device</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {troubleshootingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleStartTroubleshooting(type.id)}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <i className={`material-icons ${type.color}`}>{type.icon}</i>
              <h3 className="font-medium">{type.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
