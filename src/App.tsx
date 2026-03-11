import React, { useState } from 'react';
import { 
  Plus, Users, CheckCircle2, X, Eye, Calendar, Activity, AlertCircle
} from 'lucide-react';

interface Patient {
  id: string;
  nhc: string;
  firstName: string;
  lastName: string;
  secondName: string;
  secondLastName: string;
  sex: string;
  age: string;
  date: string;
  condition: string;
  reason: string;
  isPregnant: boolean | null;
  illness: string;
  history: string[];
  observations: string;
}

const initialPatients: Patient[] = [
  { 
    id: '1', nhc: 'NHC-10001', firstName: 'Juan', lastName: 'Pérez', secondName: 'Carlos', secondLastName: 'Gómez',
    sex: 'Hombre', age: '45', date: '2023-10-25', condition: 'H', reason: 'Dolor de cabeza', isPregnant: false,
    illness: 'Cefalea tensional de 3 días', history: ['hist-8'], observations: 'Controlado con medicación'
  },
  { 
    id: '2', nhc: 'NHC-10002', firstName: 'María', lastName: 'González', secondName: 'Elena', secondLastName: 'Ruiz',
    sex: 'Mujer', age: '32', date: '2023-10-26', condition: 'M', reason: 'Control prenatal', isPregnant: true,
    illness: 'Embarazo de 24 semanas', history: [], observations: 'Sin novedades'
  },
];

const pathologicalHistoryOptions = [
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('register');
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    unicode: '',
    establishment: '',
    nhc: '',
    firstName: '',
    lastName: '',
    secondName: '',
    secondLastName: '',
    sex: 'Hombre',
    age: '',
    condition: 'H',
    reason: '',
    isPregnant: false as boolean | null,
    illness: '',
    history: [] as string[],
    observations: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleCheckboxChange = (id: string) => {
    setFormData(prev => {
      const history = prev.history.includes(id)
        ? prev.history.filter(h => h !== id)
        : [...prev.history, id];
      return { ...prev, history };
    });
  };

  const handleSave = () => {
    const requiredFields = [
      { field: formData.nhc, name: 'NHC' },
      { field: formData.firstName, name: 'Primer Nombre' },
      { field: formData.lastName, name: 'Primer Apellido' },
      { field: formData.age, name: 'Edad' },
      { field: formData.reason, name: 'Motivo de Consulta' },
      { field: formData.illness, name: 'Enfermedad Actual' }
    ];

    const missingFields = requiredFields.filter(f => !f.field.trim());

    if (missingFields.length > 0) {
      setFormError(`Faltan campos obligatorios: ${missingFields.map(f => f.name).join(', ')}`);
      setTimeout(() => setFormError(null), 5000);
      return;
    }

    const newPatient: Patient = {
      id: Date.now().toString(),
      nhc: formData.nhc || `NHC-${Math.floor(Math.random() * 10000) + 10000}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      secondName: formData.secondName,
      secondLastName: formData.secondLastName,
      sex: formData.sex,
      age: formData.age,
      date: new Date().toISOString().split('T')[0],
      condition: formData.condition,
      reason: formData.reason,
      isPregnant: formData.isPregnant,
      illness: formData.illness,
      history: formData.history,
      observations: formData.observations
    };
    
    setPatients([newPatient, ...patients]);
    
    // Reset form
    setFormData({
      unicode: '', establishment: '', nhc: '', firstName: '', lastName: '', secondName: '', secondLastName: '',
      sex: 'Hombre', age: '', condition: 'H', reason: '', isPregnant: false, illness: '', history: [], observations: ''
    });
    
    // Show toast and switch to list
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setActiveTab('list');
  };

  const handleCancel = () => {
    setFormError(null);
    setFormData({
      unicode: '', establishment: '', nhc: '', firstName: '', lastName: '', secondName: '', secondLastName: '',
      sex: 'Hombre', age: '', condition: 'H', reason: '', isPregnant: false, illness: '', history: [], observations: ''
    });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-zinc-900 pb-12">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-zinc-900 text-white rounded-xl shadow-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium text-sm">Registro guardado exitosamente</p>
          </div>
        </div>
      )}

      {/* Error Toast Notification */}
      {formError && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-red-50 text-red-900 border border-red-200 rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-md">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="font-medium text-sm">{formError}</p>
          </div>
        </div>
      )}

      {/* Modal for Patient Details */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 py-5 flex justify-between items-center z-10">
              <h2 className="text-lg font-medium text-zinc-900">
                Detalle del Paciente
              </h2>
              <button onClick={() => setSelectedPatient(null)} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-1">NHC</p>
                  <p className="font-mono text-sm font-medium text-zinc-900">{selectedPatient.nhc}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-1">Fecha de Registro</p>
                  <p className="text-sm font-medium text-zinc-900">{selectedPatient.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-1">Nombre Completo</p>
                  <p className="font-medium text-zinc-900 text-xl tracking-tight">
                    {selectedPatient.lastName} {selectedPatient.secondLastName} {selectedPatient.firstName} {selectedPatient.secondName}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-1">Sexo / Edad</p>
                  <p className="text-sm font-medium text-zinc-900">{selectedPatient.sex}, {selectedPatient.age || '-'} años</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-1">Condición</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-900">
                    {selectedPatient.condition}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-zinc-100 pt-6">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-3">Motivo de Consulta</p>
                <p className="text-sm text-zinc-700 leading-relaxed">{selectedPatient.reason || 'No especificado'}</p>
              </div>

              <div className="border-t border-zinc-100 pt-6">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-3">Enfermedad Actual</p>
                <p className="text-sm text-zinc-700 leading-relaxed">{selectedPatient.illness || 'No especificada'}</p>
              </div>

              <div className="border-t border-zinc-100 pt-6">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-3">Antecedentes</p>
                {selectedPatient.history.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-zinc-700 space-y-2">
                    {selectedPatient.history.map(id => {
                      const opt = pathologicalHistoryOptions.find(o => o.id === id);
                      return opt ? <li key={id}>{opt.label}</li> : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-500 italic">Ninguno registrado</p>
                )}
                {selectedPatient.observations && (
                  <div className="mt-6">
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Observaciones</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{selectedPatient.observations}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-zinc-50/50 border-t border-zinc-100 px-8 py-5 flex justify-end">
              <button onClick={() => setSelectedPatient(null)} className="btn-secondary">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* BEGIN: MainHeader */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 tracking-tight">IESS-SSC</h1>
              <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">Sistema de Salud Pública</p>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest block mb-0.5">Hoja No.</span>
              <span className="text-sm font-mono font-medium text-zinc-900">0821-763</span>
            </div>
            {activeTab === 'register' && (
              <button onClick={handleSave} className="btn-primary hidden sm:flex">
                Guardar Registro
              </button>
            )}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex space-x-8">
          <button
            onClick={() => setActiveTab('register')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'register' 
                ? 'border-zinc-900 text-zinc-900' 
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Nuevo Registro
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'list' 
                ? 'border-zinc-900 text-zinc-900' 
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Pacientes Registrados
            <span className={`ml-1.5 py-0.5 px-2 rounded-full text-xs font-mono ${activeTab === 'list' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-100 text-zinc-500'}`}>
              {patients.length}
            </span>
          </button>
        </div>
      </header>
      {/* END: MainHeader */}

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        {activeTab === 'register' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* BEGIN: PatientIdentitySection */}
            <section className="form-section-card">
              <div className="section-header">
                <span className="section-number">01</span>
                DATOS DE ESTABLECIMIENTO Y USUARIO
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  <div className="md:col-span-2">
                    <label className="grid-label">Institución del Sistema</label>
                    <input className="input-field" readOnly type="text" value="IESS-SSC" />
                  </div>
                  <div>
                    <label className="grid-label">Unicódigo</label>
                    <input className="input-field" name="unicode" value={formData.unicode} onChange={handleInputChange} placeholder="0000" type="text" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="grid-label">Establecimiento de Salud</label>
                    <input className="input-field" name="establishment" value={formData.establishment} onChange={handleInputChange} placeholder="Nombre del hospital o centro" type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Número Historia Clínica</label>
                    <input className="input-field font-mono" name="nhc" value={formData.nhc} onChange={handleInputChange} placeholder="NHC-12345" type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8 pt-8 border-t border-zinc-100">
                  <div>
                    <label className="grid-label">Primer Apellido</label>
                    <input className="input-field" name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Ej. Pérez" />
                  </div>
                  <div>
                    <label className="grid-label">Segundo Apellido</label>
                    <input className="input-field" name="secondLastName" value={formData.secondLastName} onChange={handleInputChange} type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Primer Nombre</label>
                    <input className="input-field" name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Ej. Juan" />
                  </div>
                  <div>
                    <label className="grid-label">Segundo Nombre</label>
                    <input className="input-field" name="secondName" value={formData.secondName} onChange={handleInputChange} type="text" />
                  </div>
                  <div>
                    <label className="grid-label">Sexo</label>
                    <select className="input-field" name="sex" value={formData.sex} onChange={handleInputChange}>
                      <option>Hombre</option>
                      <option>Mujer</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="grid-label">Edad</label>
                      <input className="input-field" name="age" value={formData.age} onChange={handleInputChange} type="number" placeholder="Años" />
                    </div>
                    <div>
                      <label className="grid-label">Condición</label>
                      <select className="input-field font-medium" name="condition" value={formData.condition} onChange={handleInputChange}>
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
            <section className="form-section-card">
              <div className="section-header">
                <span className="section-number">02</span>
                MOTIVO DE CONSULTA
              </div>
              <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-grow w-full">
                  <textarea 
                    className="input-field resize-none" 
                    name="reason" value={formData.reason} onChange={handleInputChange}
                    placeholder="Escriba el motivo principal de la visita..." rows={3}
                  ></textarea>
                </div>
                <div className="w-full md:w-72 bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100">
                  <label className="grid-label text-center mb-4">¿Embarazada?</label>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, isPregnant: true }))}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                        formData.isPregnant === true
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      SÍ
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, isPregnant: false }))}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                        formData.isPregnant === false
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
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
            <section className="form-section-card">
              <div className="section-header">
                <span className="section-number">03</span>
                ENFERMEDAD ACTUAL
              </div>
              <div className="p-8">
                <label className="grid-label mb-3">Cronología, localización, características, intensidad, causa aparente...</label>
                <textarea 
                  className="input-field resize-none" 
                  name="illness" value={formData.illness} onChange={handleInputChange}
                  placeholder="Detalle la evolución del cuadro clínico..." rows={4}
                ></textarea>
              </div>
            </section>
            {/* END: CurrentIllnessSection */}

            {/* BEGIN: PathologicalHistorySection */}
            <section className="form-section-card">
              <div className="section-header">
                <span className="section-number">04</span>
                ANTECEDENTES PATOLÓGICOS PERSONALES
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pathologicalHistoryOptions.map((item) => (
                    <label key={item.id} className="checkbox-card">
                      <input 
                        className="h-4 w-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900" 
                        type="checkbox" 
                        checked={formData.history.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <span className="ml-3 text-sm font-medium text-zinc-700 select-none">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-zinc-100">
                  <label className="grid-label mb-3">Observaciones de antecedentes</label>
                  <textarea 
                    className="input-field resize-none" 
                    name="observations" value={formData.observations} onChange={handleInputChange}
                    placeholder="Especifique detalles sobre los antecedentes marcados..." rows={3}
                  ></textarea>
                </div>
              </div>
            </section>
            {/* END: PathologicalHistorySection */}

            {/* BEGIN: FormActions */}
            <div className="flex flex-col items-end mt-10">
              {formError && (
                <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100 animate-in fade-in max-w-2xl text-sm font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button onClick={handleCancel} className="btn-secondary">
                  Cancelar
                </button>
                <button onClick={handleSave} className="btn-primary">
                  Finalizar Registro
                </button>
              </div>
            </div>
            {/* END: FormActions */}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium tracking-tight text-zinc-900">Listado de Pacientes</h2>
              <button 
                onClick={() => setActiveTab('register')}
                className="btn-primary !py-2 !px-4 !text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Nuevo Paciente
              </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-100">
                  <thead className="bg-zinc-50/50">
                    <tr>
                      <th scope="col" className="px-8 py-4 text-left text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Paciente</th>
                      <th scope="col" className="px-8 py-4 text-left text-[11px] font-medium text-zinc-500 uppercase tracking-widest">NHC</th>
                      <th scope="col" className="px-8 py-4 text-left text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Fecha Registro</th>
                      <th scope="col" className="px-8 py-4 text-left text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Condición</th>
                      <th scope="col" className="px-8 py-4 text-right text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-100">
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center justify-center text-zinc-400">
                            <Users className="w-10 h-10 mb-4 text-zinc-300" />
                            <p className="text-sm font-medium text-zinc-500">No hay pacientes registrados.</p>
                            <button onClick={() => setActiveTab('register')} className="mt-4 text-zinc-900 text-sm font-medium hover:underline">
                              Registrar el primer paciente
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center font-medium text-sm">
                                {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-zinc-900">{patient.lastName} {patient.firstName}</div>
                                <div className="text-xs text-zinc-500 mt-0.5">{patient.sex}, {patient.age || '-'} años</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="text-sm font-mono text-zinc-600">
                              {patient.nhc}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-sm text-zinc-600 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {patient.date}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-zinc-100 text-zinc-800">
                              {patient.condition}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => setSelectedPatient(patient)}
                              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 font-medium bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver detalle
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BEGIN: Footer */}
      <footer className="mt-8 border-t border-zinc-200 py-8 text-center">
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
          © 2023 IESS-SSC - Gestión de Historia Clínica Electrónica
        </p>
      </footer>
      {/* END: Footer */}
    </div>
  );
}
