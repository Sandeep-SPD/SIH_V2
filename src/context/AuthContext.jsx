import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_COMPLAINTS } from '../data/mockComplaints.js';
import { INITIAL_UNIVERSITIES } from '../data/mockUniversities.js';
import { INITIAL_INDUSTRY } from '../data/mockIndustry.js';
import { INITIAL_REQUESTS, INITIAL_INDUSTRY_INTERESTS } from '../data/mockRequests.js';
import { INITIAL_SYSTEMIC_ISSUES, INITIAL_VERIFICATION_QUEUE } from '../data/mockSystemicIssues.js';
import { JHARKHAND_DISTRICTS } from '../data/jharkhandDistrics.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Role: null | 'citizen' | 'university' | 'industry' | 'government'
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // In-memory data states
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [universities, setUniversities] = useState(INITIAL_UNIVERSITIES);
  const [industries, setIndustries] = useState(INITIAL_INDUSTRY);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [interests, setInterests] = useState(INITIAL_INDUSTRY_INTERESTS);
  const [systemicIssues, setSystemicIssues] = useState(INITIAL_SYSTEMIC_ISSUES);
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [votedComplaints, setVotedComplaints] = useState({}); // { [id]: 'up' | 'down' }

  // Districts with dynamic open complaint count calculation
  const districts = useMemo(() => {
    return JHARKHAND_DISTRICTS.map(dist => {
      const openCount = complaints.filter(
        c => c.district.toLowerCase().includes(dist.name.toLowerCase()) && c.status !== 'Completed'
      ).length;
      return {
        ...dist,
        openComplaintsCount: openCount > 0 ? openCount : dist.openComplaintsCount
      };
    });
  }, [complaints]);

  // Login handler
  const login = (selectedRole, userDetails = {}) => {
    setRole(selectedRole);
    if (selectedRole === 'citizen') {
      setCurrentUser({
        name: userDetails.name || 'Pooja Soren (Citizen)',
        phone: userDetails.phone || '9835124501',
        district: userDetails.district || 'East Singhbhum (Jamshedpur)',
        role: 'citizen'
      });
    } else if (selectedRole === 'university') {
      const selectedUni = universities.find(u => u.id === userDetails.universityId) || universities[0];
      setCurrentUser({
        ...selectedUni,
        role: 'university'
      });
    } else if (selectedRole === 'industry') {
      const selectedInd = industries.find(i => i.id === userDetails.industryId) || industries[0];
      setCurrentUser({
        ...selectedInd,
        role: 'industry'
      });
    } else if (selectedRole === 'government') {
      setCurrentUser({
        name: 'Dr. Manish Ranjan, IAS',
        title: 'Principal Secretary (Higher Education & Innovation, Govt. of Jharkhand)',
        district: 'Ranchi',
        role: 'government'
      });
    }
  };

  // Logout handler
  const logout = () => {
    setRole(null);
    setCurrentUser(null);
  };

  // Add a new citizen complaint
  const addComplaint = (newComplaintData) => {
    const newId = `CMP-JH-2025-${String(complaints.length + 1).padStart(3, '0')}`;
    const newComplaint = {
      id: newId,
      title: newComplaintData.title,
      description: newComplaintData.description,
      submitterType: newComplaintData.submitterType || 'Citizen',
      submitterName: currentUser?.name || newComplaintData.submitterName || 'Anonymous Citizen',
      phone: currentUser?.phone || newComplaintData.phone || '9876543210',
      domain: newComplaintData.domain || 'Water',
      district: newComplaintData.district || 'Ranchi',
      location: newComplaintData.location || 'Township Area',
      status: 'Submitted',
      clusterSize: 1,
      priorityScore: Math.floor(Math.random() * 15) + 80,
      assignedUniversityId: null,
      assignedUniversityName: null,
      needsFunding: false,
      readyForDeployment: false,
      openToMentorship: true,
      upvotes: 1,
      downvotes: 0,
      lastUpdateDate: new Date().toISOString().split('T')[0],
      facultyMentor: null,
      studentTeam: [],
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          status: 'Submitted',
          note: 'Complaint registered by citizen with local geotag and domain categorization.',
          by: currentUser?.name || 'Citizen'
        }
      ],
      fieldVerificationStatus: 'Pending',
      milestones: [],
      outcomeTag: null,
      review: null,
      photoUrl: newComplaintData.photoUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80'
    };

    setComplaints(prev => [newComplaint, ...prev]);
    return newComplaint;
  };

  // Upvote / Downvote complaints
  const voteComplaint = (id, direction) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        const currentVote = votedComplaints[id];
        let upvotes = c.upvotes;
        let downvotes = c.downvotes;

        if (currentVote === direction) {
          // undo vote
          if (direction === 'up') upvotes -= 1;
          if (direction === 'down') downvotes -= 1;
          setVotedComplaints(v => {
            const copy = { ...v };
            delete copy[id];
            return copy;
          });
        } else {
          // new or changed vote
          if (currentVote === 'up') upvotes -= 1;
          if (currentVote === 'down') downvotes -= 1;

          if (direction === 'up') upvotes += 1;
          if (direction === 'down') downvotes += 1;

          setVotedComplaints(v => ({ ...v, [id]: direction }));
        }

        return { ...c, upvotes, downvotes };
      })
    );
  };

  // University accepts a problem
  const acceptProblem = (complaintId, teamData = {}) => {
    const uni = currentUser?.role === 'university' ? currentUser : universities[0];
    const today = new Date().toISOString().split('T')[0];

    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          status: 'University Assigned',
          assignedUniversityId: uni.id,
          assignedUniversityName: uni.name,
          lastUpdateDate: today,
          facultyMentor: teamData.facultyMentor || `Dr. ${uni.shortName} Faculty Lead`,
          studentTeam: teamData.studentTeam || [{ name: 'Research Scholar', dept: uni.departments[0] || 'Engineering', year: 'Final Year' }],
          timeline: [
            ...c.timeline,
            {
              date: today,
              status: 'University Assigned',
              note: `${uni.name} officially accepted problem for applied research.`,
              by: uni.shortName
            }
          ]
        };
      })
    );
  };

  // Update Project Workspace (University)
  const updateProjectWorkspace = (complaintId, updates) => {
    const today = new Date().toISOString().split('T')[0];
    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== complaintId) return c;
        const updated = { ...c, ...updates, lastUpdateDate: today };

        if (updates.newMilestone) {
          updated.milestones = [...(c.milestones || []), { date: today, text: updates.newMilestone }];
          delete updated.newMilestone;
        }

        if (updates.status && updates.status !== c.status) {
          updated.timeline = [
            ...c.timeline,
            {
              date: today,
              status: updates.status,
              note: updates.statusNote || `Project phase transitioned to: ${updates.status}`,
              by: currentUser?.shortName || c.assignedUniversityName || 'University Team'
            }
          ];
        }

        // If completed with outcome tag, reflect in university points
        if (updates.status === 'Completed' && c.status !== 'Completed') {
          const uniId = c.assignedUniversityId;
          if (uniId) {
            setUniversities(unis =>
              unis.map(u => {
                if (u.id !== uniId) return u;
                const newPatents = updates.outcomeTag === 'Patent Filed' ? u.outcomes.patents + 1 : u.outcomes.patents;
                const newPapers = updates.outcomeTag === 'Paper Published' ? u.outcomes.papers + 1 : u.outcomes.papers;
                const newStartups = updates.outcomeTag === 'Startup Formed' ? u.outcomes.startups + 1 : u.outcomes.startups;
                return {
                  ...u,
                  resolvedCount: u.resolvedCount + 1,
                  points: u.points + 100,
                  outcomes: { patents: newPatents, papers: newPapers, startups: newStartups }
                };
              })
            );
          }
        }

        return updated;
      })
    );
  };

  // Citizen adds review to completed complaint
  const addReview = (complaintId, { rating, comment }) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== complaintId) return c;
        return {
          ...c,
          review: { rating, comment }
        };
      })
    );
  };

  // Industry expresses interest in a project
  const expressIndustryInterest = (projectId, offerType = 'Funding & Mentorship') => {
    const ind = currentUser?.role === 'industry' ? currentUser : industries[0];
    const newInterest = {
      id: `INT-${Date.now().toString().slice(-4)}`,
      projectId,
      industryId: ind.id,
      industryName: ind.name,
      offering: offerType,
      status: 'Accepted'
    };
    setInterests(prev => [newInterest, ...prev]);
    return newInterest;
  };

  // University sends funding/mentorship request to Industry
  const sendCollabRequest = (req) => {
    const uni = currentUser?.role === 'university' ? currentUser : universities[0];
    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      universityId: uni.id,
      universityName: uni.shortName || uni.name,
      industryId: req.industryId,
      industryName: req.industryName,
      projectId: req.projectId,
      projectTitle: req.projectTitle,
      requestType: req.requestType || 'Funding',
      amountRequested: req.amountRequested || 0,
      note: req.note || '',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  // Industry approves or declines request
  const respondToRequest = (requestId, decision) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;
        return { ...r, status: decision };
      })
    );

    // If approved and funding, increment industry KPI
    if (decision === 'Approved') {
      const targetReq = requests.find(r => r.id === requestId);
      if (targetReq && targetReq.requestType === 'Funding') {
        const indId = targetReq.industryId;
        setIndustries(inds =>
          inds.map(i => {
            if (i.id !== indId) return i;
            return {
              ...i,
              totalFunded: i.totalFunded + Number(targetReq.amountRequested || 0),
              projectsFunded: i.projectsFunded + 1
            };
          })
        );
      }
    }
  };

  // Government approves or rejects organization in Verification Queue
  const verifyOrg = (queueId, action) => {
    const org = verificationQueue.find(q => q.id === queueId);
    if (!org) return;

    setVerificationQueue(prev => prev.filter(q => q.id !== queueId));

    if (action === 'Approved') {
      if (org.type === 'University') {
        const newUni = {
          id: `uni-${Date.now().toString().slice(-4)}`,
          name: org.orgName,
          shortName: org.orgName.split(',')[0],
          district: org.district,
          departments: org.departments,
          specializations: ['Applied Regional Research'],
          hasIncubationCentre: false,
          points: 100,
          resolvedCount: 0,
          activeProjectsCount: 0,
          rank: universities.length + 1,
          outcomes: { patents: 0, papers: 0, startups: 0 },
          verified: true
        };
        setUniversities(prev => [...prev, newUni]);
      } else if (org.type === 'Industry') {
        const newInd = {
          id: `ind-${Date.now().toString().slice(-4)}`,
          name: org.orgName,
          shortName: org.orgName,
          hq: org.district,
          type: 'Corporate Partner',
          focusAreas: ['Rural Innovation', 'Water', 'Energy'],
          totalFunded: 0,
          projectsFunded: 0,
          ongoingProjects: 0,
          completedProjects: 0,
          mentorshipsGiven: 0,
          verified: true,
          contactPerson: org.applicantEmail
        };
        setIndustries(prev => [...prev, newInd]);
      }
    }
  };

  const value = {
    role,
    currentUser,
    login,
    logout,
    complaints,
    universities,
    industries,
    requests,
    interests,
    systemicIssues,
    verificationQueue,
    districts,
    votedComplaints,
    addComplaint,
    voteComplaint,
    acceptProblem,
    updateProjectWorkspace,
    addReview,
    expressIndustryInterest,
    sendCollabRequest,
    respondToRequest,
    verifyOrg
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
