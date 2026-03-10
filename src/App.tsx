import React, { useState } from 'react';

export default function App() {
  const [isPregnant, setIsPregnant] = useState<boolean | null>(false);

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
            <div className="text-right">
              <span className="grid-label">Hoja No.</span>
              <span className="text-lg font-mono font-bold text-blue-600">0821-763</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Guardar Registro
            </button>
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <input className="input-field" placeholder="NHC-12345" type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6 pt-6 border-t border-gray-100">
              <div>
                <label className="grid-label">Primer Apellido</label>
                <input className="input-field" type="text" />
              </div>
              <div>
                <label className="grid-label">Segundo Apellido</label>
                <input className="input-field" type="text" />
              </div>
              <div>
                <label className="grid-label">Primer Nombre</label>
                <input className="input-field" type="text" />
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
                  <select className="input-field">
                    <option>H</option>
                    <option>D</option>
                    <option>M</option>
                    <option>A</option>
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
          <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button className="px-8 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-md transition-all flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            Finalizar Registro
          </button>
        </div>
        {/* END: FormActions */}
      </main>

      {/* BEGIN: Footer */}
      <footer className="mt-12 border-t border-gray-200 py-6 text-center text-gray-400 text-sm">
        © 2023 IESS-SSC - Formulario 0821-763 - Gestión de Historia Clínica Electrónica
      </footer>
      {/* END: Footer */}
    </div>
  );
}
