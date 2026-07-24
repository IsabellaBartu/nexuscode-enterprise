import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!form.message.trim()) errs.message = 'Mensagem é obrigatória';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Entre em Contato</h2>
          <p className="mt-4 text-lg text-gray-600">
            Conte-nos sobre seu projeto. Vamos transformá-lo juntos.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-8 text-center">
            <p className="text-lg font-semibold">Mensagem enviada com sucesso!</p>
            <p className="mt-2 text-sm">Em breve entraremos em contato.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-400' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Seu nome"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.message ? 'border-red-400' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
                placeholder="Descreva seu projeto..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
