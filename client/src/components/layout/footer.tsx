import { useQuery } from "@tanstack/react-query";

interface VersionInfo {
  version: string;
  name: string;
  build: string;
  release: string;
}

export default function Footer() {
  const { data: versionInfo } = useQuery<VersionInfo>({
    queryKey: ["/api/version"],
    retry: false,
  });

  return (
    <footer className="bg-white dark:bg-gray-800 amoled:bg-black border-t border-gray-200 dark:border-gray-700 amoled:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-2">
            <i className="material-icons text-primary-700 text-xl">build</i>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white amoled:text-white">
                JCR Guide Pro
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professional repair guides for everyone
              </p>
            </div>
          </div>

          {/* Center - Quick Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="/troubleshooting" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
            >
              Help
            </a>
            <a 
              href="/software-tools" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
            >
              Tools
            </a>
            <a 
              href="/create-guide" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
            >
              Contribute
            </a>
            <a 
              href="mailto:JCRguideproofficial@gmail.com" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right side - Version Info */}
          <div className="text-center md:text-right">
            {versionInfo && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div>Version {versionInfo.version}</div>
                <div>Build {versionInfo.build}</div>
              </div>
            )}
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              © 2025 JCR Guide Pro
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}