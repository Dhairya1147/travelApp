import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentManager = ({ documents, onUpdateDocuments }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [newDocument, setNewDocument] = useState({
    type: '',
    name: '',
    number: '',
    expiryDate: '',
    issueDate: '',
    issuingCountry: ''
  });

  const documentTypes = [
    { id: 'passport', label: 'Passport', icon: 'BookOpen', description: 'International travel document' },
    { id: 'visa', label: 'Visa', icon: 'FileText', description: 'Entry permit for specific countries' },
    { id: 'drivingLicense', label: 'Driving License', icon: 'Car', description: 'For car rentals and identification' },
    { id: 'insurance', label: 'Travel Insurance', icon: 'Shield', description: 'Medical and travel coverage' },
    { id: 'vaccination', label: 'Vaccination Certificate', icon: 'Heart', description: 'Health requirements proof' },
    { id: 'emergencyContact', label: 'Emergency Contacts', icon: 'Phone', description: 'Important contact information' }
  ];

  const getDocumentStatus = (document) => {
    if (!document?.expiryDate) return { status: 'active', color: 'text-success', bgColor: 'bg-success/10' };
    
    const expiryDate = new Date(document.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'text-error', bgColor: 'bg-error/10' };
    } else if (daysUntilExpiry < 90) {
      return { status: 'expiring', color: 'text-warning', bgColor: 'bg-warning/10' };
    } else {
      return { status: 'active', color: 'text-success', bgColor: 'bg-success/10' };
    }
  };

  const handleAddDocument = () => {
    const document = {
      id: Date.now()?.toString(),
      ...newDocument,
      uploadDate: new Date()?.toISOString(),
      verified: false
    };
    
    onUpdateDocuments([...documents, document]);
    setNewDocument({
      type: '',
      name: '',
      number: '',
      expiryDate: '',
      issueDate: '',
      issuingCountry: ''
    });
    setIsAddingDocument(false);
  };

  const handleDeleteDocument = (documentId) => {
    onUpdateDocuments(documents?.filter(doc => doc?.id !== documentId));
    setSelectedDocument(null);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes?.map((type) => {
          const userDocs = documents?.filter(doc => doc?.type === type?.id);
          const hasExpiring = userDocs?.some(doc => {
            const status = getDocumentStatus(doc);
            return status?.status === 'expiring' || status?.status === 'expired';
          });
          
          return (
            <div key={type?.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-travel cursor-pointer"
                 onClick={() => setActiveSection(type?.id)}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${hasExpiring ? 'bg-warning/10' : ''}`}>
                  <Icon name={type?.icon} size={20} className={hasExpiring ? 'text-warning' : 'text-primary'} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{type?.label}</h3>
                  <p className="text-sm text-muted-foreground">{userDocs?.length} document{userDocs?.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              {hasExpiring && (
                <div className="flex items-center gap-1 text-xs text-warning">
                  <Icon name="AlertTriangle" size={12} />
                  <span>Requires attention</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Lock" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Secure Document Storage</h4>
            <p className="text-sm text-muted-foreground">
              Your documents are encrypted and stored securely. They're available offline and can be accessed even without internet connection during travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentList = (typeId) => {
    const typeInfo = documentTypes?.find(t => t?.id === typeId);
    const typeDocs = documents?.filter(doc => doc?.type === typeId);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSection('overview')}
            >
              <Icon name="ArrowLeft" size={16} />
            </Button>
            <div>
              <h3 className="font-medium text-foreground">{typeInfo?.label}</h3>
              <p className="text-sm text-muted-foreground">{typeInfo?.description}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setNewDocument(prev => ({ ...prev, type: typeId }));
              setIsAddingDocument(true);
            }}
            iconName="Plus"
            iconPosition="left"
          >
            Add {typeInfo?.label}
          </Button>
        </div>
        {typeDocs?.length > 0 ? (
          <div className="space-y-3">
            {typeDocs?.map((document) => {
              const status = getDocumentStatus(document);
              return (
                <div key={document?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-travel">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${status?.bgColor?.replace('/10', '')}`}></div>
                    <div>
                      <h4 className="font-medium text-foreground">{document?.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>#{document?.number}</span>
                        {document?.expiryDate && (
                          <span>Expires: {new Date(document.expiryDate)?.toLocaleDateString()}</span>
                        )}
                        {document?.verified && (
                          <div className="flex items-center gap-1 text-success">
                            <Icon name="CheckCircle" size={12} />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDocument(document)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDocument(document?.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name={typeInfo?.icon} size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No {typeInfo?.label} Added</h4>
            <p className="text-muted-foreground mb-4">Add your {typeInfo?.label?.toLowerCase()} for easy access during travel</p>
            <Button
              onClick={() => {
                setNewDocument(prev => ({ ...prev, type: typeId }));
                setIsAddingDocument(true);
              }}
              iconName="Plus"
              iconPosition="left"
            >
              Add {typeInfo?.label}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderAddDocument = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAddingDocument(false)}
        >
          <Icon name="ArrowLeft" size={16} />
        </Button>
        <h3 className="font-medium text-foreground">
          Add {documentTypes?.find(t => t?.id === newDocument?.type)?.label}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Document Name"
          type="text"
          value={newDocument?.name}
          onChange={(e) => setNewDocument(prev => ({ ...prev, name: e?.target?.value }))}
          placeholder="e.g., Indian Passport"
          required
        />
        <Input
          label="Document Number"
          type="text"
          value={newDocument?.number}
          onChange={(e) => setNewDocument(prev => ({ ...prev, number: e?.target?.value }))}
          placeholder="Document ID/Number"
          required
        />
        <Input
          label="Issue Date"
          type="date"
          value={newDocument?.issueDate}
          onChange={(e) => setNewDocument(prev => ({ ...prev, issueDate: e?.target?.value }))}
        />
        <Input
          label="Expiry Date"
          type="date"
          value={newDocument?.expiryDate}
          onChange={(e) => setNewDocument(prev => ({ ...prev, expiryDate: e?.target?.value }))}
        />
        <Input
          label="Issuing Country"
          type="text"
          value={newDocument?.issuingCountry}
          onChange={(e) => setNewDocument(prev => ({ ...prev, issuingCountry: e?.target?.value }))}
          placeholder="Country of issue"
        />
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h4 className="font-medium text-foreground mb-2">Upload Document</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Take a photo or upload a scan of your document
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" iconName="Camera" iconPosition="left">
            Take Photo
          </Button>
          <Button variant="outline" iconName="Upload" iconPosition="left">
            Upload File
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleAddDocument} iconName="Check" iconPosition="left">
          Save Document
        </Button>
        <Button variant="outline" onClick={() => setIsAddingDocument(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderDocumentDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedDocument(null)}
        >
          <Icon name="ArrowLeft" size={16} />
        </Button>
        <h3 className="font-medium text-foreground">{selectedDocument?.name}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Document Number</label>
            <p className="text-foreground">{selectedDocument?.number}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
            <p className="text-foreground">
              {selectedDocument?.issueDate ? new Date(selectedDocument.issueDate)?.toLocaleDateString() : 'Not specified'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
            <p className="text-foreground">
              {selectedDocument?.expiryDate ? new Date(selectedDocument.expiryDate)?.toLocaleDateString() : 'No expiry'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Issuing Country</label>
            <p className="text-foreground">{selectedDocument?.issuingCountry || 'Not specified'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Document Image</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="Download">
              Download
            </Button>
            <Button variant="outline" size="sm" iconName="Share">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Document Manager</h2>
          <p className="text-sm text-muted-foreground">
            Store and manage your travel documents securely
          </p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
          <Icon name="Shield" size={14} />
          <span>Encrypted</span>
        </div>
      </div>

      {isAddingDocument ? renderAddDocument() :
       selectedDocument ? renderDocumentDetails() :
       activeSection === 'overview' ? renderOverview() :
       renderDocumentList(activeSection)}
    </div>
  );
};

export default DocumentManager;