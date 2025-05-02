import React from 'react';
import TopNav from './TopNav'
import Sidebar from './Sidebar';

function layout({children}) {
  return (
    <div>
        <TopNav />
        <div className="py-12 container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Contenu principal avec gestion responsive */}
                <main className={`
                flex-1 overflow-y-auto transition-all duration-300    
                `}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
                
                {/* Sidebar */}
                <Sidebar />
            </div>
        </div>
    </div>
  )
}

export default layout
