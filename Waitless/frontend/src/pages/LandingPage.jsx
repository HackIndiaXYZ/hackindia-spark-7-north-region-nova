import React, { useState } from 'react';
import { MapPin, Search, Navigation, Clock } from 'lucide-react';
import HospitalModal from '../components/HospitalModal';

const HospitalCard = ({ hospital, onClick }) => {
  return (
    <div className="card" onClick={onClick} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <img src={hospital.image} alt={hospital.name} className="hospital-img" />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '0.25rem 0.75rem', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-dark)', boxShadow: 'var(--shadow-sm)' }}>
          <Clock size={14} color="var(--primary)" /> ~{hospital.waitMins} min wait
        </div>
      </div>
      <div className="hospital-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.25rem' }}>{hospital.name}</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
            <MapPin size={14} /> {hospital.location}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {hospital.departments.map((dept, idx) => (
               <span key={idx} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--secondary)', color: 'var(--text-dark)', fontSize: '0.75rem', borderRadius: '0.25rem', fontWeight: '500' }}>
                 {dept}
               </span>
            ))}
          </div>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          style={{ width: '100%', padding: '0.75rem' }}
        >
          Book / Join Queue
        </button>
      </div>
    </div>
  );
}

const LandingPage = () => {
  const [search, setSearch] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Dummy Data with Images
  const hospitals = [
    { 
      id: 1, 
      name: 'CityCare Hospital', 
      location: 'New York, NY', 
      departments: ['General OPD', 'Cardiology', 'Neurology'],
      waitMins: 15,
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 2, 
      name: 'Apollo Clinic', 
      location: 'Brooklyn, NY', 
      departments: ['Dental', 'Pediatrics'],
      waitMins: 5,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      name: 'Sunrise Medical Center', 
      location: 'Queens, NY', 
      departments: ['General OPD', 'Orthopedics'],
      waitMins: 45,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 4, 
      name: 'Westside Health', 
      location: 'Los Angeles, CA', 
      departments: ['Neurology', 'Cardiology'],
      waitMins: 20,
      image: 'https://images.unsplash.com/photo-1538108149393-ceb66fa1e580?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.location.toLowerCase().includes(search.toLowerCase()) ||
    h.departments.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-off)', minHeight: 'calc(100vh - 73px)', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #0284c7 100%)', 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        color: 'white'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1px', fontWeight: '800' }}>
          Skip the Waiting Room.
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', opacity: 0.9 }}>
          Join hospital queues digitally and arrive exactly when needed.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '1rem', maxWidth: '700px', margin: '0 auto', backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.75rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input 
              type="text" 
              placeholder="Search hospitals by name, city, or department..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.125rem', outline: 'none', color: 'var(--text-dark)' }}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0 2rem', fontSize: '1.125rem', borderRadius: '0.5rem' }}>
            <Navigation size={20} /> Near Me
          </button>
        </div>
      </div>

      {/* Hospital List */}
      <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '2rem' }}>
          {search ? 'Search Results' : 'Top Rated Hospitals Near You'}
        </h2>
        
        {filteredHospitals.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredHospitals.map(h => (
              <HospitalCard key={h.id} hospital={h} onClick={() => setSelectedHospital(h)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <MapPin size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <h3>No hospitals found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedHospital && (
        <HospitalModal hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
      )}
      
    </div>
  );
};

export default LandingPage;
