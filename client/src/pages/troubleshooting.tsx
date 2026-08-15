import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import TroubleshootingFlowchart from "@/components/repair/troubleshooting-flowchart";
import type { TroubleshootingFlow } from "@shared/schema";

export default function Troubleshooting() {
  const { type } = useParams<{ type?: string }>();

  const { data: flows = [], isLoading } = useQuery<TroubleshootingFlow[]>({
    queryKey: ["/api/troubleshooting-flows"],
  });

  const selectedFlow = flows.find(flow => flow.type === type);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Troubleshooting Assistant</h1>
          <p className="text-gray-600">Follow the interactive guide to diagnose and fix your device issues.</p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl shadow-material p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <TroubleshootingFlowchart selectedFlow={selectedFlow} />
            
            {/* Help & Contact Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 amoled:bg-black rounded-xl shadow-material p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <i className="material-icons text-primary-700 mr-2">help_center</i>
                Need Additional Help?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Quick Support Options</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <i className="material-icons text-blue-600 text-lg mr-3">live_help</i>
                      <span>Browse our comprehensive repair guides</span>
                    </div>
                    <div className="flex items-center">
                      <i className="material-icons text-green-600 text-lg mr-3">build</i>
                      <span>Use our software diagnostic tools</span>
                    </div>
                    <div className="flex items-center">
                      <i className="material-icons text-purple-600 text-lg mr-3">search</i>
                      <span>Search for device-specific solutions</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Contact Support</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 amoled:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="material-icons text-primary-700 text-lg mr-2">email</i>
                      <span className="font-medium text-gray-900 dark:text-white">Email Support</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Can't find what you're looking for? Contact our app creator directly:
                    </p>
                    <a 
                      href="mailto:JCRguideproofficial@gmail.com"
                      className="inline-flex items-center text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
                    >
                      JCRguideproofficial@gmail.com
                      <i className="material-icons text-sm ml-1">open_in_new</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
