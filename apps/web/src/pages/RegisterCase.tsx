import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../utils/api';
import { useLanguage } from '../context/useLanguage';

type Choice = 'yes' | 'no' | 'unknown';

interface OffenceForm {
  act: 'BNS' | 'IPC' | 'SPECIAL';
  section: string;
  bailable: Choice;
  maxYears: string;
  deathOrLife: boolean;
}

const emptyOffence = (): OffenceForm => ({
  act: 'BNS',
  section: '',
  bailable: 'unknown',
  maxYears: '',
  deathOrLife: false,
});

const TEXT = {
  en: {
    title: 'Register Case',
    subtitle: 'Enter the case details below.',
    policeStation: 'Police Station',
    stationPlaceholder: 'Enter police station',
    district: 'District ID',
    districtHint: 'Enter the district ID configured by the project.',
    fir: 'FIR Number',
    cnr: 'CNR Number',
    optional: 'Optional',
    personHeading: 'About the person in custody',
    personNote: 'A volunteer will check these details before they are used. Leave anything blank if you are not sure.',
    name: 'Name',
    arrestDate: 'Date of arrest',
    priorConviction: 'Has this person ever been convicted of an offence before?',
    no: 'No',
    yes: 'Yes',
    unknown: "I don't know",
    otherPending: 'Other cases are also pending against this person',
    chargesheet: 'Date the chargesheet was filed (if any)',
    offencesHeading: 'Offences (as written in the FIR)',
    law: 'Law',
    otherLaw: 'Other law',
    section: 'Section',
    bailable: 'Is it bailable?',
    maxYears: 'Maximum punishment (years)',
    deathOrLife: 'Can be punished with death or life imprisonment',
    addOffence: 'Add another offence',
    remove: 'Remove',
    submit: 'Submit Case',
    submitting: 'Submitting...',
    success: 'Case registered successfully!',
    failed: 'Unable to register case.',
    viewCases: 'View My Cases',
  },
  ta: {
    title: 'வழக்கைப் பதிவு செய்க',
    subtitle: 'கீழே உள்ள வழக்கு விவரங்களை உள்ளிடவும்.',
    policeStation: 'காவல் நிலையம்',
    stationPlaceholder: 'காவல் நிலையத்தின் பெயர்',
    district: 'மாவட்ட ID',
    districtHint: 'உங்கள் மாவட்டத்திற்கான சரியான ID-ஐ உள்ளிடவும்.',
    fir: 'FIR எண்',
    cnr: 'CNR எண்',
    optional: 'விருப்பம்',
    personHeading: 'காவலில் உள்ளவரைப் பற்றி',
    personNote: 'இந்த விவரங்கள் பயன்படுத்தப்படும் முன் ஒரு தன்னார்வலர் சரிபார்ப்பார். உறுதியாகத் தெரியாதவற்றை காலியாக விடலாம்.',
    name: 'பெயர்',
    arrestDate: 'கைது செய்யப்பட்ட தேதி',
    priorConviction: 'இவர் முன்பு எப்போதாவது குற்றத்திற்காக தண்டிக்கப்பட்டுள்ளாரா?',
    no: 'இல்லை',
    yes: 'ஆம்',
    unknown: 'தெரியவில்லை',
    otherPending: 'இவர் மீது வேறு வழக்குகளும் நிலுவையில் உள்ளன',
    chargesheet: 'குற்றப்பத்திரிகை தாக்கல் செய்யப்பட்ட தேதி (இருந்தால்)',
    offencesHeading: 'குற்றங்கள் (FIR-இல் உள்ளபடி)',
    law: 'சட்டம்',
    otherLaw: 'பிற சட்டம்',
    section: 'பிரிவு',
    bailable: 'ஜாமீனில் விடக்கூடிய குற்றமா?',
    maxYears: 'அதிகபட்ச தண்டனை (ஆண்டுகள்)',
    deathOrLife: 'மரண தண்டனை அல்லது ஆயுள் தண்டனை விதிக்கக்கூடியது',
    addOffence: 'மற்றொரு குற்றத்தைச் சேர்க்கவும்',
    remove: 'நீக்கு',
    submit: 'வழக்கைப் பதிவு செய்',
    submitting: 'பதிவு செய்கிறது...',
    success: 'வழக்கு வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    failed: 'வழக்கைப் பதிவு செய்ய முடியவில்லை.',
    viewCases: 'வழக்குகளைக் காண்க',
  },
};

const toBool = (c: Choice): boolean | undefined => (c === 'yes' ? true : c === 'no' ? false : undefined);

export const RegisterCase: React.FC = () => {
  const { lang } = useLanguage();
  const text = TEXT[lang];

  const [policeStation, setPoliceStation] = useState('');
  const [districtId, setDistrictId] = useState('chennai-01');
  const [firNumber, setFirNumber] = useState('');
  const [cnrNumber, setCnrNumber] = useState('');

  const [name, setName] = useState('');
  const [arrestDate, setArrestDate] = useState('');
  const [priorConviction, setPriorConviction] = useState<Choice>('unknown');
  const [otherPending, setOtherPending] = useState(false);
  const [chargesheetDate, setChargesheetDate] = useState('');
  const [offences, setOffences] = useState<OffenceForm[]>([emptyOffence()]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateOffence = (index: number, patch: Partial<OffenceForm>) => {
    setOffences((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Only send the person's details if a name was entered
    const accused = name.trim()
      ? {
          name: name.trim(),
          custodyStartDate: arrestDate || undefined,
          // "No prior conviction" means first-time offender
          isFirstTimeOffender: priorConviction === 'no' ? true : priorConviction === 'yes' ? false : undefined,
          otherPendingCases: otherPending,
          offences: offences
            .filter((o) => o.section.trim())
            .map((o) => {
              const years = Number(o.maxYears);
              return {
                act: o.act,
                section: o.section.trim(),
                isBailable: toBool(o.bailable),
                maxSentenceYears: years > 0 ? years : undefined,
                punishableWithDeathOrLife: o.deathOrLife,
              };
            }),
        }
      : undefined;

    try {
      await fetchApi('/cases', {
        method: 'POST',
        body: JSON.stringify({
          policeStation: policeStation.trim(),
          districtId: districtId.trim(),
          firNumber: firNumber.trim() || undefined,
          cnrNumber: cnrNumber.trim() || undefined,
          chargesheetFiledOn: chargesheetDate || undefined,
          accused,
        }),
      });

      setMessage(text.success);
      setPoliceStation('');
      setFirNumber('');
      setCnrNumber('');
      setName('');
      setArrestDate('');
      setPriorConviction('unknown');
      setOtherPending(false);
      setChargesheetDate('');
      setOffences([emptyOffence()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : text.failed);
    } finally {
      setLoading(false);
    }
  };

  const choiceSelect = (value: Choice, onChange: (c: Choice) => void) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Choice)}
      className="w-full border rounded-lg p-3 bg-white"
    >
      <option value="unknown">{text.unknown}</option>
      <option value="no">{text.no}</option>
      <option value="yes">{text.yes}</option>
    </select>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-2">{text.title}</h1>
      <p className="text-text-secondary mb-6">{text.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-2">{text.policeStation} *</label>
          <input
            type="text"
            value={policeStation}
            onChange={(e) => setPoliceStation(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
            placeholder={text.stationPlaceholder}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{text.district} *</label>
          <input
            type="text"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
            placeholder="chennai-01"
          />
          <p className="text-sm text-text-secondary mt-1">{text.districtHint}</p>
        </div>

        <div>
          <label className="block font-medium mb-2">{text.fir}</label>
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder={text.optional}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">{text.cnr}</label>
          <input
            type="text"
            value={cnrNumber}
            onChange={(e) => setCnrNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder={text.optional}
          />
        </div>

        <div className="border-t pt-5">
          <h2 className="text-lg font-bold text-primary mb-1">{text.personHeading}</h2>
          <p className="text-sm text-text-secondary mb-4">{text.personNote}</p>

          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-2">{text.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">{text.arrestDate}</label>
              <input
                type="date"
                value={arrestDate}
                onChange={(e) => setArrestDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">{text.priorConviction}</label>
              {choiceSelect(priorConviction, setPriorConviction)}
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={otherPending}
                onChange={(e) => setOtherPending(e.target.checked)}
                className="mt-1"
              />
              <span>{text.otherPending}</span>
            </label>

            <div>
              <label className="block font-medium mb-2">{text.chargesheet}</label>
              <input
                type="date"
                value={chargesheetDate}
                onChange={(e) => setChargesheetDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">{text.offencesHeading}</h3>

              <div className="space-y-4">
                {offences.map((offence, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4 bg-white">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">{text.law}</label>
                        <select
                          value={offence.act}
                          onChange={(e) => updateOffence(index, { act: e.target.value as OffenceForm['act'] })}
                          className="w-full border rounded-lg p-3 bg-white"
                        >
                          <option value="BNS">BNS</option>
                          <option value="IPC">IPC</option>
                          <option value="SPECIAL">{text.otherLaw}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{text.section}</label>
                        <input
                          type="text"
                          value={offence.section}
                          onChange={(e) => updateOffence(index, { section: e.target.value })}
                          className="w-full border rounded-lg p-3"
                          placeholder="303(2)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{text.bailable}</label>
                      {choiceSelect(offence.bailable, (c) => updateOffence(index, { bailable: c }))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{text.maxYears}</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={offence.maxYears}
                        onChange={(e) => updateOffence(index, { maxYears: e.target.value })}
                        className="w-full border rounded-lg p-3"
                      />
                    </div>

                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={offence.deathOrLife}
                        onChange={(e) => updateOffence(index, { deathOrLife: e.target.checked })}
                        className="mt-1"
                      />
                      <span>{text.deathOrLife}</span>
                    </label>

                    {offences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setOffences((prev) => prev.filter((_, i) => i !== index))}
                        className="text-sm text-red-600 underline"
                      >
                        {text.remove}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setOffences((prev) => [...prev, emptyOffence()])}
                className="mt-3 text-primary underline text-sm"
              >
                + {text.addOffence}
              </button>
            </div>
          </div>
        </div>

        {message && (
          <p className="text-green-700 font-medium" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
          {loading ? text.submitting : text.submit}
        </button>

        <Link to="/cases" className="block text-center text-primary underline">
          {text.viewCases}
        </Link>
      </form>
    </div>
  );
};