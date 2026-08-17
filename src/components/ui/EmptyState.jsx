import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ icon: Icon = Inbox, title = 'No Data', message = 'There are no records to display.', action }) => (
  <div className="empty-state">
    <div className="empty-state-icon">
      <Icon size={40} />
    </div>
    <h3 className="empty-state-title">{title}</h3>
    <p className="empty-state-message">{message}</p>
    {action && <div className="empty-state-action">{action}</div>}
  </div>
);
