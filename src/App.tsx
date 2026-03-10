import React, { useState } from 'react';

interface Patient {
  id: string;
  nhc: string;
  firstName: string;
  lastName: string;
  date: string;
  condition: string;
}

const initialPatients: Patient[] = [
  { id: '1', nhc: 'NHC-10001', firstName: 'Juan', lastName: 'Pérez', date: '2023-10-25', condition: 'H' },
  { id: '2', nhc: 'NHC-10002', firstName: 'María', lastName: 'González', date: '2023-10-26', condition: 'M' },
  { id: '3', nhc: 'NHC-10003', firstName: 'Carlos', lastName: 'López', date: '2023-10-27', condition: 'H' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('register');
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  
  // Form states
  const [isPregnant, setIsPregnant] = useState<boolean | null>(false);
  const [nhc, setNhc] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [condition, setCondition] = useState('H');

  const pathologicalHistory = [
    { id: 'hist-1', label: '1. Alergia Antibiótico' },
    { id: 'hist-2', label: '2. Alergia Anestesia' },
    { id: 'hist-3', label: '3. Hemorragias' },
    { id: 'hist-4', label: '4. VIH / SIDA' },
    { id: 'hist-5', label: '5. Tuberculosis' },
    { id: 'hist-6', label: '6. Asma' },
    { id: 'hist-7', label: '7. Diabetes' },
    { id: 'hist-8', label: '8. Hipertensión Art.' },
    { id: 'hist-9', label: '9. Enf. Cardiaca' },
    { id: 'hist-10', label: '10. Otro' },
  ];

  const handleSave = () => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      nhc: nhc || `NHC-${Math.floor(Math.random() * 10000) + 10000}`,
      firstName: firstName || 'Paciente',
      lastName: lastName || 'Nuevo',
      date: new Date().toISOString().split('T')[0],
      condition: condition,
    };
    setPatients([newPatient, ...patients]);
    
    // Reset form
    setNhc('');
    setFirstName('');
    setLastName('');
    setCondition('H');
    setIsPregnant(false);
    
    // Switch to list
    setActiveTab('list');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-gray-900 pb-12">
      {/* BEGIN: MainHeader */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">IESS-SSC</h1>
              <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">Sistema de Salud Pública</p>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="text-right hidden sm:block">
              <span className="grid-label">Hoja No.</span>
              <span className="text-lg font-mono font-bold text-blue-600">0821-763</span>
            </div>
            {activeTab === 'register' && (
              <button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                Guardar Registro
              </button>
            )}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 mt-2">
          <button
            onClick={() => setActiveTab('register')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'register' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Nuevo Registro
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'list' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pacientes Registrados
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {patients.length}
            </span>
          </button>
        </div>
      </header>
      {/* END: MainHeader */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'register' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* BEGIN: PatientIdentitySection */}
            <section className="form-section-card" data-purpose="section-a">
              <div className="section-header header-accent-green">
                <span className="mr-2">A.</span> DATOS DE ESTABLECIMIENTO Y USUARIO / PACIENTE
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  <div className="md:col-span-2">
                    <label className="grid-label">Institución del Sistema</label>
                    <input className="input-field" readOnly type="text" defaultValue="IESS-SSC" />
                  </div>
                  <div>
                    <label className="grid-label">Unicódigo</label>
                    <input className="input-field" placeholder="0000" type="text" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="grid-label">Establecimiento de Salud</label>
                    <input className="input-field" placeholder="Nombre del hospital o centro" type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Número Historia Clínica</label>
                    <input 
                      className="input-field" 
                      placeholder="NHC-12345" 
                      type="text" 
                      value={nhc}
                      onChange={(e) => setNhc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <label className="grid-label">Primer Apellido</label>
                    <input 
                      className="input-field" 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="grid-label">Segundo Apellido</label>
                    <input className="input-field" type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Primer Nombre</label>
                    <input 
                      className="input-field" 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="grid-label">Segundo Nombre</label>
                    <input className="input-field" type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Sexo</label>
                    <select className="input-field">
                      <option>Hombre</option>
                      <option>Mujer</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="grid-label">Edad</label>
                      <input className="input-field" type="number" />
                    </div>
                    <div>
                      <label className="grid-label">Condición</label>
                      <select 
                        className="input-field"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                      >
                        <option value="H">H</option>
                        <option value="D">D</option>
                        <option value="M">M</option>
                        <option value="A">A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* END: PatientIdentitySection */}

            {/* BEGIN: ConsultationSection */}
            <section className="form-section-card" data-purpose="section-b">
              <div className="section-header header-accent-purple">
                <span className="mr-2">B.</span> MOTIVO DE CONSULTA
              </div>
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-grow w-full">
                  <textarea className="input-field" placeholder="Escriba el motivo principal de la visita..." rows={2}></textarea>
                </div>
                <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="grid-label text-center mb-3">¿Embarazada?</label>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => setIsPregnant(true)}
                      className={`px-4 py-2 text-sm font-bold rounded border transition-colors w-20 ${
                        isPregnant === true
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      SÍ
                    </button>
                    <button
                      onClick={() => setIsPregnant(false)}
                      className={`px-4 py-2 text-sm font-bold rounded border transition-colors w-20 ${
                        isPregnant === false
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* END: ConsultationSection */}

            {/* BEGIN: CurrentIllnessSection */}
            <section className="form-section-card" data-purpose="section-c">
              <div className="section-header header-accent-purple">
                <span className="mr-2">C.</span> ENFERMEDAD ACTUAL
              </div>
              <div className="p-6">
                <label className="grid-label mb-2">Cronología, localización, características, intensidad, causa aparente...</label>
                <textarea className="input-field" placeholder="Detalle la evolución del cuadro clínico..." rows={5}></textarea>
              </div>
            </section>
            {/* END: CurrentIllnessSection */}

            {/* BEGIN: PathologicalHistorySection */}
            <section className="form-section-card" data-purpose="section-d">
              <div className="section-header header-accent-purple">
                <span className="mr-2">D.</span> ANTECEDENTES PATOLÓGICOS PERSONALES
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {pathologicalHistory.map((item) => (
                    <div key={item.id} className="flex items-center p-3 bg-slate-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                      <input className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" id={item.id} type="checkbox" />
                      <label className="ml-3 text-xs font-semibold text-gray-700" htmlFor={item.id}>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="grid-label mb-2">Observaciones de antecedentes</label>
                  <textarea className="input-field" placeholder="Especifique detalles sobre los antecedentes marcados..." rows={3}></textarea>
                </div>
              </div>
            </section>
            {/* END: PathologicalHistorySection */}

            {/* BEGIN: FormActions */}
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => {
                  setNhc(''); setFirstName(''); setLastName(''); setCondition('H'); setIsPregnant(false);
                }}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-md transition-all flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                Finalizar Registro
              </button>
            </div>
            {/* END: FormActions */}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="form-section-card">
              <div className="section-header header-accent-purple flex justify-between items-center">
                <div>
                  <span className="mr-2">📋</span> LISTADO DE PACIENTES
                </div>
                <button 
                  onClick={() => setActiveTab('register')}
                  className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded text-xs font-bold transition-colors"
                >
                  + Nuevo Paciente
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">NHC</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Paciente</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Condición</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No hay pacientes registrados.
                        </td>
                      </tr>
                    ) : (
                      patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">
                            {patient.nhc}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{patient.lastName} {patient.firstName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {patient.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {patient.condition}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 font-semibold">Ver detalle</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* BEGIN: Footer */}
      <footer className="mt-12 border-t border-gray-200 py-6 text-center text-gray-400 text-sm">
        © 2023 IESS-SSC - Formulario 0821-763 - Gestión de Historia Clínica Electrónica
      </footer>
      {/* END: Footer */}
    </div>
  );
}
