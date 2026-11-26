
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

    </div>
  )
}

export default App
