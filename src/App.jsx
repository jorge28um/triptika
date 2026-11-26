
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

// Normalizar direcciones web
function normalizarUrl(url) {
  if (!url) return null

  return /^https?:\/\//i.test(url)
    ? url
    : `https://${url}`
}

// Mostrar una dirección web sin protocolo ni barra final
function mostrarUrl(url) {
  return url
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '')
}

// Botón para copiar información
function Copiar({ texto }) {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1800)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <button
      type="button"
      className="copiar"
      onClick={copiar}
    >
      {copiado ? 'Copiado ✓' : 'Copiar'}
    </button>
  )
}

function App() {
  const [empresa, setEmpresa] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Consultar información de la empresa en Supabase
  useEffect(() => {
    async function cargarEmpresa() {
      const { data, error } = await supabase
        .from('empresa')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setEmpresa(data)
      }

      setCargando(false)
    }

    cargarEmpresa()
  }, [])

  if (cargando) {
    return (
      <p className="estado">
        Cargando información...
      </p>
    )
  }

  if (error) {
    return (
      <p className="estado">
        No se pudo cargar la información: {error}
      </p>
    )
  }

  if (!empresa) {
    return (
      <p className="estado">
        No hay información disponible.
      </p>
    )
  }

  // Preparar enlaces
  const sitioWeb = normalizarUrl(empresa.sitio_web)
  const facebook = normalizarUrl(empresa.facebook)
  const linkedin = normalizarUrl(empresa.linkedin)

  // Enlace directo a WhatsApp
  const whatsapp = 'https://wa.me/50670995497?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.'

  return (
    <div className="pagina">

      <div className="fondo-logo" />
      <div className="fondo-decorativo decoracion-uno" />
      <div className="fondo-decorativo decoracion-dos" />

      {/* ENCABEZADO */}
      <header className="encabezado">

        <img
          src="/logo.png"
          alt="TRIPTIKA Consultores en Recursos Humanos"
          className="logo"
        />

        <div className="linea-dorada" />

        <h1>{empresa.nombre}</h1>

        {empresa.descripcion && (
          <p className="descripcion">
            {empresa.descripcion}
          </p>
        )}

        <p className="mensaje">
          Conectamos talento y oportunidades.
        </p>

      </header>

      {/* INFORMACIÓN DE CONTACTO */}
      <main className="contacto">

        <div className="titulo-contacto">
          <span>ESTAMOS PARA AYUDARTE</span>

          <h2>Conversemos</h2>

          <p>
            Encuentra aquí nuestros canales de contacto.
            Será un gusto atenderte.
          </p>
        </div>

        <div className="canales">

          {/* CORREO ELECTRÓNICO */}
          {empresa.email && (
            <div className="canal">

              <div className="icono">✉</div>

              <div className="informacion">
                <span className="etiqueta">
                  Correo electrónico
                </span>

                <a href={`mailto:${empresa.email}`}>
                  {empresa.email}
                </a>
              </div>

              <Copiar texto={empresa.email} />

            </div>
          )}

          {/* TELÉFONO */}
          {empresa.telefono && (
            <div className="canal">

              <div className="icono">☎</div>

              <div className="informacion">
                <span className="etiqueta">
                  Teléfono
                </span>

                <a href={`tel:${empresa.telefono}`}>
                  {empresa.telefono}
                </a>
              </div>

              <Copiar texto={empresa.telefono} />

            </div>
          )}

          {/* DIRECCIÓN */}
          {empresa.direccion && (
            <div className="canal">

              <div className="icono">⌖</div>

              <div className="informacion">
                <span className="etiqueta">
                  Dirección
                </span>

                <span className="valor">
                  {empresa.direccion}
                </span>
              </div>

            </div>
          )}

          {/* SITIO WEB */}
          {sitioWeb && (
            <div className="canal">

              <div className="icono">↗</div>

              <div className="informacion">
                <span className="etiqueta">
                  Sitio web
                </span>

                <a
                  href={sitioWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mostrarUrl(empresa.sitio_web)}
                </a>
              </div>

            </div>
          )}

          {/* FACEBOOK */}
          {facebook && (
            <div className="canal">

              <div className="icono">f</div>

              <div className="informacion">
                <span className="etiqueta">
                  Facebook
                </span>

                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar Facebook ↗
                </a>
              </div>

            </div>
          )}

          {/* LINKEDIN */}
          {linkedin && (
            <div className="canal">

              <div className="icono">in</div>

              <div className="informacion">
                <span className="etiqueta">
                  LinkedIn
                </span>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar LinkedIn ↗
                </a>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* PIE DE PÁGINA */}
      <footer>

        <div className="linea-dorada" />

        <p>
          TRIPTIKA · CONSULTORES EN RECURSOS HUMANOS
        </p>

        <span>
          Talento · Desarrollo · Oportunidades
        </span>

      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={whatsapp}
        className="whatsapp-flotante"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar con TRIPTIKA por WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          width="25"
          height="25"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.04 2.67A13.27 13.27 0 0 0 4.67 22.8L3 29l6.35-1.65a13.3 13.3 0 1 0 6.69-24.68Zm0 24.27a11 11 0 0 1-5.6-1.53l-.4-.24-3.76.98 1-3.67-.26-.42a10.98 10.98 0 1 1 9.02 4.88Zm6.03-8.23c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.39.25-.72.08-.33-.17-1.4-.52-2.67-1.65-.99-.88-1.66-1.96-1.85-2.29-.19-.33-.02-.51.14-.68.15-.15.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.79-1.01-2.45-.26-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.75s1.19 3.19 1.35 3.41c.17.22 2.34 3.58 5.67 5.02.79.34 1.4.55 1.88.7.79.25 1.51.21 2.08.13.63-.09 1.95-.8 2.23-1.57.28-.77.28-1.43.19-1.57-.08-.14-.3-.22-.63-.39Z" />
        </svg>

        <span>¡Hablemos por WhatsApp!</span>
      </a>

    </div>
  )
}

export default App
