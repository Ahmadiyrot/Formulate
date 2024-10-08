import useAuth from "../../hooks/useAuth.js";
import React, { useState } from 'react';
import FormsPage from './FormsPage.js'
import DeletedTab from "./DeletedTab.js";
import DraftsTab from "./DraftsTab.js";



const SettingsTab = () => <div>Settings Content</div>;
const SupportTab = () => <div>Support Content</div>;

const TabsPage = () => {
    const { auth } = useAuth()
    const [activeTab, setActiveTab] = useState('forms');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'forms':
                return <FormsPage />;
            case 'drafts':
                return <DraftsTab />;
            case 'deleted':
                return <DeletedTab />;
            case 'settings':
                return <SettingsTab />;
            case 'support':
                return <SupportTab />;
            default:
                return <FormsPage />;
        }
    };

    return (
        <div className="container-fluid">
            {/* First Row */}
            <div className="row">
                <div className="col d-flex justify-content-start flex-row align-items-center p-3">
                    <h2 className="ps-2 pe-2 text-white">Welcome back! <br />&emsp;&emsp;&emsp;&emsp;&emsp;{auth?.userName}</h2>
                </div>
            </div>

            {/* Second Row */}
            <div className="row">
                {/* First Column (Tabs) */}
                <div className="col-2">
                    <ul className="nav flex-column nav-pills custom-nav">
                        <li className="nav-item">
                            <a
                                className={`nav-link tabsstyling ${activeTab === 'forms' ? 'active' : ''}`}
                                onClick={() => setActiveTab('forms')}
                            >
                                <i className="bi bi-file-earmark-text"></i> Forms
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link tabsstyling ${activeTab === 'drafts' ? 'active' : ''}`}
                                onClick={() => setActiveTab('drafts')}
                            >
                                <i className="bi bi-file-earmark-post"></i> Drafts
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link tabsstyling ${activeTab === 'deleted' ? 'active' : ''}`}
                                onClick={() => setActiveTab('deleted')}
                            >
                                <i className="bi bi-trash"></i> Deleted
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link tabsstyling ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <i className="bi bi-gear"></i> Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link tabsstyling ${activeTab === 'support' ? 'active' : ''}`}
                                onClick={() => setActiveTab('support')}
                            >
                                <i className="bi bi-question-circle"></i> Support
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Column */}
                <div className="col-10">
                    <div className=" mt-3">
                        <div className="tab-pane fade show active">{renderTabContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default TabsPage