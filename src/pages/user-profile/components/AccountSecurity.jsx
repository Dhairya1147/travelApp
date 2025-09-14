import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const AccountSecurity = ({ securitySettings, onUpdateSecurity }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const securityItems = [
    {
      id: 'password',
      title: 'Password',
      description: 'Last changed 3 months ago',
      status: 'good',
      icon: 'Key',
      action: 'Change Password'
    },
    {
      id: 'twoFactor',
      title: 'Two-Factor Authentication',
      description: securitySettings?.twoFactorEnabled ? 'Enabled via SMS' : 'Not enabled',
      status: securitySettings?.twoFactorEnabled ? 'excellent' : 'warning',
      icon: 'Shield',
      action: securitySettings?.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'
    },
    {
      id: 'loginActivity',
      title: 'Login Activity',
      description: `${securitySettings?.recentLogins?.length} recent logins`,
      status: 'good',
      icon: 'Activity',
      action: 'View Activity'
    },
    {
      id: 'devices',
      title: 'Connected Devices',
      description: `${securitySettings?.connectedDevices?.length} active devices`,
      status: 'good',
      icon: 'Smartphone',
      action: 'Manage Devices'
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'excellent':
        return { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' };
      case 'good':
        return { color: 'text-primary', bgColor: 'bg-primary/10', icon: 'Shield' };
      case 'warning':
        return { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertTriangle' };
      case 'danger':
        return { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'Info' };
    }
  };

  const handlePasswordChange = () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock password change
    onUpdateSecurity({
      ...securitySettings,
      passwordLastChanged: new Date()?.toISOString()
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveSection(null);
  };

  const handleToggle2FA = () => {
    if (securitySettings?.twoFactorEnabled) {
      // Disable 2FA
      onUpdateSecurity({
        ...securitySettings,
        twoFactorEnabled: false,
        twoFactorMethod: null
      });
    } else {
      // Enable 2FA
      onUpdateSecurity({
        ...securitySettings,
        twoFactorEnabled: true,
        twoFactorMethod: 'sms'
      });
    }
    setActiveSection(null);
  };

  const renderPasswordSection = () => (
    <div className="space-y-4">
      <Input
        label="Current Password"
        type="password"
        value={passwordData?.currentPassword}
        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
        placeholder="Enter current password"
        required
      />
      <Input
        label="New Password"
        type="password"
        value={passwordData?.newPassword}
        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
        placeholder="Enter new password"
        description="Must be at least 8 characters with numbers and symbols"
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        value={passwordData?.confirmPassword}
        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
        placeholder="Confirm new password"
        required
      />
      <div className="flex gap-2">
        <Button onClick={handlePasswordChange} iconName="Check" iconPosition="left">
          Update Password
        </Button>
        <Button variant="outline" onClick={() => setActiveSection(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderTwoFactorSection = () => (
    <div className="space-y-4">
      {!securitySettings?.twoFactorEnabled ? (
        <div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Icon name="Shield" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Enhanced Security</h4>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
              <input type="radio" name="2faMethod" value="sms" defaultChecked className="mt-1" />
              <div>
                <div className="font-medium text-foreground">SMS Text Message</div>
                <div className="text-sm text-muted-foreground">Receive codes via text message</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
              <input type="radio" name="2faMethod" value="app" className="mt-1" />
              <div>
                <div className="font-medium text-foreground">Authenticator App</div>
                <div className="text-sm text-muted-foreground">Use Google Authenticator or similar app</div>
              </div>
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication Enabled</h4>
                <p className="text-sm text-muted-foreground">Your account is protected with SMS verification</p>
              </div>
            </div>
          </div>
          <Input
            label="Enter verification code to disable"
            type="text"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e?.target?.value)}
            placeholder="123456"
            description="We've sent a code to your registered phone number"
          />
        </div>
      )}
      <div className="flex gap-2">
        <Button onClick={handleToggle2FA} iconName={securitySettings?.twoFactorEnabled ? "ShieldOff" : "Shield"} iconPosition="left">
          {securitySettings?.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </Button>
        <Button variant="outline" onClick={() => setActiveSection(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderLoginActivitySection = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {securitySettings?.recentLogins?.map((login, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${login?.suspicious ? 'bg-error' : 'bg-success'}`}></div>
              <div>
                <div className="font-medium text-foreground">{login?.device}</div>
                <div className="text-sm text-muted-foreground">{login?.location}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground">{new Date(login.timestamp)?.toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground">{new Date(login.timestamp)?.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={() => setActiveSection(null)}>
        Close
      </Button>
    </div>
  );

  const renderDevicesSection = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {securitySettings?.connectedDevices?.map((device, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name={device?.type === 'mobile' ? 'Smartphone' : 'Monitor'} size={16} className="text-muted-foreground" />
              <div>
                <div className="font-medium text-foreground">{device?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {device?.location} • Last active {device?.lastActive}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {device?.current && (
                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">Current</span>
              )}
              {!device?.current && (
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={() => setActiveSection(null)}>
        Close
      </Button>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Account Security</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account security settings and monitor login activity
          </p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
          <Icon name="Shield" size={14} />
          <span>Secure</span>
        </div>
      </div>
      {activeSection ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSection(null)}
            >
              <Icon name="ArrowLeft" size={16} />
            </Button>
            <h3 className="font-medium text-foreground">
              {securityItems?.find(item => item?.id === activeSection)?.title}
            </h3>
          </div>
          {activeSection === 'password' && renderPasswordSection()}
          {activeSection === 'twoFactor' && renderTwoFactorSection()}
          {activeSection === 'loginActivity' && renderLoginActivitySection()}
          {activeSection === 'devices' && renderDevicesSection()}
        </div>
      ) : (
        <div className="space-y-4">
          {securityItems?.map((item) => {
            const statusConfig = getStatusConfig(item?.status);
            return (
              <div key={item?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-travel">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg ${statusConfig?.bgColor} flex items-center justify-center`}>
                    <Icon name={item?.icon} size={20} className={statusConfig?.color} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{item?.title}</h3>
                    <p className="text-sm text-muted-foreground">{item?.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveSection(item?.id)}
                >
                  {item?.action}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccountSecurity;