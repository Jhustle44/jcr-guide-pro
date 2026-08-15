interface SoftwareLinksProps {
  deviceType: string;
}

export default function SoftwareLinks({ deviceType }: SoftwareLinksProps) {
  const diagnosticSoftware = [
    {
      name: "HWiNFO64",
      description: "Comprehensive hardware analysis and monitoring tool",
      url: "https://www.hwinfo.com/",
      category: "Hardware Diagnostics",
      icon: "monitor_heart",
      free: true,
    },
    {
      name: "CrystalDiskInfo",
      description: "Hard drive health monitoring and S.M.A.R.T. analysis",
      url: "https://crystalmark.info/en/software/crystaldiskinfo/",
      category: "Storage Diagnostics",
      icon: "storage",
      free: true,
    },
    {
      name: "MemTest86",
      description: "Memory testing tool for detecting RAM issues",
      url: "https://www.memtest86.com/",
      category: "Memory Testing",
      icon: "memory",
      free: true,
    },
    {
      name: "GPU-Z",
      description: "Graphics card information and monitoring utility",
      url: "https://www.techpowerup.com/gpuz/",
      category: "Graphics Diagnostics",
      icon: "videogame_asset",
      free: true,
    },
  ];

  const repairSoftware = [
    {
      name: "Rufus",
      description: "Create bootable USB drives for OS installation and recovery",
      url: "https://rufus.ie/",
      category: "Bootable Media",
      icon: "usb",
      free: true,
    },
    {
      name: "Clonezilla",
      description: "Free disk imaging and cloning solution",
      url: "https://clonezilla.org/",
      category: "Disk Cloning",
      icon: "content_copy",
      free: true,
    },
    {
      name: "Malwarebytes",
      description: "Anti-malware and virus removal tool",
      url: "https://www.malwarebytes.com/",
      category: "Security",
      icon: "security",
      free: false,
    },
    {
      name: "DDU (Display Driver Uninstaller)",
      description: "Complete graphics driver removal and cleanup",
      url: "https://www.guru3d.com/files-details/display-driver-uninstaller-download.html",
      category: "Driver Management",
      icon: "cleaning_services",
      free: true,
    },
  ];

  const systemUtilities = [
    {
      name: "Nirsoft Utilities",
      description: "Collection of small utilities for Windows troubleshooting",
      url: "https://www.nirsoft.net/",
      category: "System Utilities",
      icon: "build",
      free: true,
    },
    {
      name: "Sysinternals Suite",
      description: "Microsoft's advanced system utilities and troubleshooting tools",
      url: "https://docs.microsoft.com/en-us/sysinternals/",
      category: "Advanced Tools",
      icon: "settings",
      free: true,
    },
    {
      name: "AIDA64",
      description: "System information, diagnostics and benchmarking suite",
      url: "https://www.aida64.com/",
      category: "System Analysis",
      icon: "analytics",
      free: false,
    },
    {
      name: "TreeSize",
      description: "Disk space analyzer to find large files and folders",
      url: "https://www.jam-software.com/treesize/",
      category: "Disk Analysis",
      icon: "folder",
      free: true,
    },
  ];

  const allSoftware = [...diagnosticSoftware, ...repairSoftware, ...systemUtilities];

  const handleDownload = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-material p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Essential Software Tools</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Download recommended software for {deviceType} troubleshooting and repair</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2">
          <span className="flex items-center">
            <i className="material-icons text-success-600 text-sm mr-1">check_circle</i>
            Free
          </span>
          <span className="flex items-center">
            <i className="material-icons text-warning-700 text-sm mr-1">paid</i>
            Paid
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSoftware.map((software, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-material transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <i className={`material-icons text-primary-700 text-xl`}>{software.icon}</i>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{software.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{software.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {software.free ? (
                  <i className="material-icons text-success-600 text-sm" title="Free">check_circle</i>
                ) : (
                  <i className="material-icons text-warning-700 text-sm" title="Paid">paid</i>
                )}
              </div>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {software.description}
            </p>
            
            <button
              onClick={() => handleDownload(software.url, software.name)}
              className="w-full px-3 py-2 bg-primary-700 text-white text-xs rounded-lg hover:bg-primary-900 transition-colors flex items-center justify-center space-x-2"
            >
              <i className="material-icons text-sm">download</i>
              <span>Download / Visit</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="material-icons text-primary-700 text-lg mt-0.5">info</i>
          <div>
            <h4 className="font-medium text-primary-900 dark:text-primary-300 mb-1">Safety Reminder</h4>
            <p className="text-sm text-primary-800 dark:text-primary-200">
              Always download software from official sources. Scan downloads with antivirus software before installation. 
              Create system backups before running diagnostic or repair tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}