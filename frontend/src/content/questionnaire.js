export const weekDays = [
  { id: 'lunes', label: 'L' },
  { id: 'martes', label: 'M' },
  { id: 'miercoles', label: 'Mi' },
  { id: 'jueves', label: 'J' },
  { id: 'viernes', label: 'V' },
  { id: 'sabado', label: 'S' },
  { id: 'domingo', label: 'D' }
]

const yesNoOptions = ['Sí', 'No', 'No aplica']

export const sectionI = {
  id: 'seccion-i',
  formTitle: 'Solicitud inicial para la modalidad de Teletrabajo',
  formSubtitle:
    'Utiliza este cuestionario cuando la persona trabajadora solicita integrarse por primera vez a la modalidad de Teletrabajo.',
  title: 'Sección I. Lista de verificación de las condiciones de seguridad y salud en el lugar de trabajo',
  description:
    'Preguntas para la persona aspirante a ser considerada en la modalidad de Teletrabajo o que labora de manera presencial y desea incorporarse.',
  generalInfo: {
    fields: [
      { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre completo' },
      {
        id: 'actividad',
        label: 'Actividad que desarrolla actualmente en el centro de trabajo',
        type: 'textarea',
        placeholder: 'Descripción de las tareas principales'
      },
      { id: 'edad', label: 'Edad', type: 'number', min: 15, max: 99 }
    ],
    weekSelections: [
      {
        id: 'dias_presenciales',
        label: 'Marque los días de la semana que actualmente trabaja presencialmente en el centro de trabajo',
        options: weekDays
      },
      {
        id: 'dias_teletrabajo',
        label: 'Marque los días de la semana que le gustaría trabajar en la modalidad de Teletrabajo',
        options: weekDays
      }
    ]
  },
  groups: [
    {
      id: 'conceptos-elementales',
      title: 'Conceptos elementales para seleccionar a las personas trabajadoras bajo la modalidad de Teletrabajo',
      questions: [
        { id: 'i_ce_trabaja_actualmente_voluntaria', text: '¿Usted trabaja en la modalidad de Teletrabajo de forma voluntaria?', options: yesNoOptions },
        { id: 'i_ce_trabajaria_voluntaria', text: '¿Usted trabajaría en la modalidad de Teletrabajo de forma voluntaria?', options: yesNoOptions },
        { id: 'i_ce_imposicion_patron', text: '¿Se incorporaría a la modalidad de Teletrabajo por imposición del patrón?', options: yesNoOptions },
        { id: 'i_ce_lugar_seleccionado', text: '¿Ha pensado usted en algún lugar que pudiera seleccionar como lugar de trabajo para realizar Teletrabajo?', options: yesNoOptions },
        { id: 'i_ce_lugar_privado', text: '¿El lugar que usted pudiera tener en mente como lugar de trabajo para realizar Teletrabajo es privado?', options: yesNoOptions },
        { id: 'i_ce_cuidados_dependientes', text: '¿En el lugar de trabajo que usted ocuparía para realizar el Teletrabajo existen menores de edad, adultos mayores o personas con alguna discapacidad que requieran de su atención?', options: yesNoOptions },
        { id: 'i_ce_solo_tics', text: '¿Para realizar su trabajo solamente utiliza las TIC (por ejemplo computadoras o tabletas electrónicas)?', options: yesNoOptions },
        { id: 'i_ce_porcentaje_jornada', text: '¿El porcentaje de tiempo de su jornada laboral que desearía trabajar en la modalidad de Teletrabajo es mayor a 40%?', options: yesNoOptions },
        { id: 'i_ce_disponibilidad_centro', text: 'En el supuesto de que se incorpore a la modalidad de Teletrabajo, ¿estaría dispuesta o dispuesto a asistir al centro de trabajo en los días considerados fuera de Teletrabajo?', options: yesNoOptions },
        { id: 'i_ce_supervision_minima', text: '¿Considera que podría laborar en la modalidad de Teletrabajo con supervisión mínima de su trabajo y tiempo de jornada?', options: yesNoOptions },
        { id: 'i_ce_mobiliario_patron', text: '¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione el mobiliario que establece la Ley?', options: yesNoOptions },
        { id: 'i_ce_equipo_hardware', text: '¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione equipo (hardware) que establece la Ley?', options: yesNoOptions },
        { id: 'i_ce_equipo_software', text: '¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione software que establece la Ley?', options: yesNoOptions }
      ]
    },
    {
      id: 'organizacion-trabajo',
      title: 'Organización para el trabajo',
      questions: [
        {
          id: 'i_org_interrupciones',
          text: '¿Al estar en modalidad de Teletrabajo considera que podría cumplir con sus metas y proyectos sin interrupciones de familiares u otras personas ajenas?',
          options: yesNoOptions
        }
      ]
    },
    {
      id: 'agentes-fisicos',
      title: 'Para agentes físicos en el lugar de trabajo',
      subgroups: [
        {
          id: 'i_agentes_espacio',
          title: 'Espacio físico (general)',
          questions: [
            {
              id: 'i_espacio_area',
              text: '¿El lugar de trabajo seleccionado dispone de un espacio físico de al menos 2 metros cuadrados para utilizarlo como plano de trabajo y una altura de al menos 2 metros?',
              options: yesNoOptions
            },
            {
              id: 'i_espacio_altura',
              text: '¿El lugar de trabajo seleccionado para realizar Teletrabajo dispone de un espacio físico de una altura de al menos 2.5 metros?',
              options: yesNoOptions
            }
          ]
        },
        {
          id: 'i_agentes_iluminacion',
          title: 'Iluminación',
          questions: [
            {
              id: 'i_iluminacion_natural',
              text: '¿El lugar de trabajo que utilizaría para el Teletrabajo cuenta con iluminación natural o artificial suficiente para la jornada?',
              options: yesNoOptions
            },
            {
              id: 'i_iluminacion_molesta',
              text: '¿Considera que la luz natural del lugar de Teletrabajo podría ser molesta para su visión?',
              options: yesNoOptions
            },
            {
              id: 'i_iluminacion_reflejos',
              text: '¿La posición de lámparas o luminarias del lugar podría producir reflejos molestos para su visión?',
              options: yesNoOptions
            },
            {
              id: 'i_iluminacion_led',
              text: '¿El lugar de trabajo que utilizaría cuenta con lámparas LED?',
              options: yesNoOptions
            },
            {
              id: 'i_iluminacion_deslumbramiento',
              text: '¿En el lugar de trabajo se evitará el deslumbramiento de la luz que entra por ventanas u otras fuentes al colocar los equipos TIC?',
              options: yesNoOptions
            }
          ]
        },
        {
          id: 'i_agentes_ventilacion',
          title: 'Ventilación',
          questions: [
            {
              id: 'i_ventilacion_ventanas',
              text: '¿El lugar de trabajo donde realizaría Teletrabajo cuenta con ventanas cerca del plano de trabajo?',
              options: yesNoOptions
            },
            {
              id: 'i_ventilacion_cerradas',
              text: 'En caso de contar con ventanas, ¿se encuentran normalmente cerradas?',
              options: yesNoOptions
            },
            {
              id: 'i_ventilacion_aire',
              text: '¿El lugar de trabajo en el que realizaría Teletrabajo cuenta con aire acondicionado?',
              options: yesNoOptions
            }
          ]
        },
        {
          id: 'i_agentes_temperatura',
          title: 'Temperatura',
          questions: [
            {
              id: 'i_temperatura_fria',
              text: '¿La temperatura del lugar de Teletrabajo le parece muy fría como para requerir uso de ropa de abrigo?',
              options: yesNoOptions
            },
            {
              id: 'i_temperatura_alta',
              text: '¿Considera que la temperatura es alta como para requerir ventilación adicional con ventilador o aire acondicionado?',
              options: yesNoOptions
            },
            {
              id: 'i_temperatura_altura',
              text: '¿La altura del lugar que utilizaría para Teletrabajo es de más de dos metros y medio?',
              options: yesNoOptions
            }
          ]
        },
        {
          id: 'i_agentes_ruido',
          title: 'Ruido',
          questions: [
            {
              id: 'i_ruido_externo',
              text: '¿En el lugar de trabajo que ocuparía para Teletrabajo se percibe ruido cercano que le impida concentrarse?',
              options: yesNoOptions
            }
          ]
        }
      ]
    },
    {
      id: 'agentes-mecanicos',
      title: 'Para agentes mecánicos',
      questions: [
        {
          id: 'i_mecanicos_areas_separadas',
          text: '¿El área destinada al Teletrabajo está separada de otras áreas por elementos físicos (paredes, puertas, ventanas)?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_pisos_libres',
          text: '¿Los pisos del lugar están despejados y libres de elementos que puedan generar tropiezos o caídas?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_botiquin',
          text: '¿Dispondrá de un botiquín de primeros auxilios cerca del lugar donde realizaría Teletrabajo?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_esquinas',
          text: '¿En el lugar de trabajo existe mobiliario con esquinas o bordes que puedan provocar golpes, raspaduras o cortes?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_directorio',
          text: '¿Dispone cerca del lugar de trabajo de un directorio telefónico de números de emergencia?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_contactos',
          text: '¿Dispone de instalaciones eléctricas (contactos) para conectar los equipos TIC?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_multicontacto',
          text: '¿Utilizará multicontactos para conectar los equipos TIC?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_cables_expuestos',
          text: '¿Las instalaciones eléctricas tienen cables expuestos o sin protección?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_distancia_contacto',
          text: '¿Los equipos TIC se conectarán a un contacto eléctrico a más de un metro de distancia?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_tierra_fisica',
          text: '¿El contacto eléctrico que empleará cuenta con conexión a tierra física?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_cables_condicion',
          text: '¿Los cables que alimentarán los equipos TIC se encuentran en malas condiciones o sin cubierta?',
          options: yesNoOptions
        },
        {
          id: 'i_mecanicos_extintor',
          text: '¿Dispone de un extintor disponible cerca del lugar destinado para Teletrabajo?',
          options: yesNoOptions
        }
      ]
    },
    {
      id: 'agentes-quimicos',
      title: 'Para agentes químicos',
      questions: [
        {
          id: 'i_quimicos_olores',
          text: '¿En el espacio físico destinado para Teletrabajo se perciben olores de sustancias químicas, humo de cigarro u otros que resulten desagradables?',
          options: yesNoOptions
        },
        {
          id: 'i_quimicos_fuma',
          text: '¿Usted o alguien más fuma dentro del lugar de trabajo que utilizaría para realizar el Teletrabajo?',
          options: yesNoOptions
        },
        {
          id: 'i_quimicos_olores_alimentos',
          text: '¿En el lugar de trabajo se concentran olores de la cocción de alimentos como asados o chiles toreados?',
          options: yesNoOptions
        }
      ]
    },
    {
      id: 'riesgo-ergonomico',
      title: 'Para factores de riesgo ergonómico',
      questions: [
        {
          id: 'i_ergonomico_silla',
          text: '¿Cuenta en el lugar con una silla o asiento disponible para realizar Teletrabajo?',
          options: yesNoOptions
        },
        {
          id: 'i_ergonomico_altura_mesa',
          text: '¿La mesa o superficie del lugar tiene una altura entre 72 cm y 76 cm?',
          options: yesNoOptions
        }
      ]
    },
    {
      id: 'riesgo-psicosocial',
      title: 'Para factores de riesgo psicosocial',
      questions: [
        {
          id: 'i_psicosocial_disposicion',
          text: '¿Usted estaría dispuesto o dispuesta a realizar Teletrabajo para su patrón?',
          options: yesNoOptions
        },
        {
          id: 'i_psicosocial_inconvenientes',
          text: 'En caso de realizar Teletrabajo, ¿tendría inconvenientes para llevarlo a cabo sin que la familia fuese un obstáculo?',
          options: yesNoOptions
        },
        {
          id: 'i_psicosocial_apartado',
          text: 'En el supuesto de realizar Teletrabajo, ¿considera que se sentiría apartado o degradado de su centro de trabajo?',
          options: yesNoOptions
        },
        {
          id: 'i_psicosocial_interferencia',
          text: '¿Considera que la modalidad de Teletrabajo podría interferir entre las actividades laborales y los tiempos para la familia?',
          options: yesNoOptions
        }
      ]
    }
  ]
}

export const sectionII = {
  id: 'seccion-ii',
  formTitle: 'Revisión de condiciones en Teletrabajo',
  formSubtitle:
    'Utiliza este cuestionario cuando la persona trabajadora ya labora en Teletrabajo y requiere refrendar sus condiciones de seguridad y salud.',
  title: 'Sección II. Verificación para personas trabajadoras en la modalidad de Teletrabajo',
  description: 'Preguntas para la persona trabajadora que refrenda sus condiciones de seguridad y salud en el trabajo.',
  generalInfo: {
    fields: [
      { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre completo' },
      {
        id: 'puesto',
        label: 'Puesto o actividad que realiza en modalidad de Teletrabajo',
        type: 'textarea',
        placeholder: 'Describe brevemente tus actividades actuales'
      },
      { id: 'antiguedad', label: 'Antigüedad en Teletrabajo (meses)', type: 'number', min: 0, max: 360 }
    ],
    weekSelections: [
      {
        id: 'dias_actuales_teletrabajo',
        label: 'Marque los días de la semana que actualmente trabaja bajo la modalidad de Teletrabajo',
        options: weekDays
      },
      {
        id: 'dias_presenciales_necesarios',
        label: 'Marque los días de la semana en los que asiste al centro de trabajo de manera presencial',
        options: weekDays
      }
    ]
  },
  groups: [
    {
      id: 'ii_iluminacion',
      title: 'Iluminación',
      questions: [
        { id: 'ii_iluminacion_natural', text: '¿El lugar de trabajo que determinó para el Teletrabajo tiene iluminación natural (luz del sol)?', options: yesNoOptions },
        { id: 'ii_iluminacion_incandescente', text: '¿El lugar de trabajo que utiliza para Teletrabajo cuenta con lámparas incandescentes (focos de filamento)?', options: yesNoOptions },
        { id: 'ii_iluminacion_fluorescente', text: '¿El lugar de trabajo que destinó para Teletrabajo cuenta con lámparas fluorescentes?', options: yesNoOptions },
        { id: 'ii_iluminacion_molesta', text: '¿Considera que la luz con la que realiza Teletrabajo es molesta para su visión?', options: yesNoOptions },
        { id: 'ii_iluminacion_reflejos', text: '¿La posición de lámparas o luminarias del lugar le producen reflejos molestos para su visión?', options: yesNoOptions },
        { id: 'ii_iluminacion_led', text: '¿El lugar de trabajo que utiliza para Teletrabajo tiene lámparas LED?', options: yesNoOptions },
        { id: 'ii_iluminacion_deslumbramiento', text: '¿Evita el deslumbramiento de la luz que entra por ventanas u otra fuente al colocar los equipos TIC?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_ventilacion',
      title: 'Ventilación',
      questions: [
        { id: 'ii_ventanas_cerca', text: '¿El lugar de trabajo donde lleva a cabo el Teletrabajo cuenta con ventanas cerca?', options: yesNoOptions },
        { id: 'ii_ventanas_cerradas', text: 'En caso de contar con ventanas, ¿se encuentran normalmente cerradas?', options: yesNoOptions },
        { id: 'ii_aire_acondicionado', text: '¿El lugar en el que se desarrolla Teletrabajo cuenta con aire acondicionado?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_temperatura',
      title: 'Temperatura',
      questions: [
        { id: 'ii_temperatura_fria', text: '¿La temperatura del lugar de Teletrabajo le parece muy fría como para requerir ropa de abrigo?', options: yesNoOptions },
        { id: 'ii_temperatura_alta', text: '¿Considera que la temperatura es alta como para requerir ventilación adicional con ventilador o aire acondicionado?', options: yesNoOptions },
        { id: 'ii_temperatura_altura', text: '¿La altura del lugar de trabajo para Teletrabajo es de más de dos metros y medio?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_ruido',
      title: 'Ruido',
      questions: [
        { id: 'ii_ruido_externo', text: '¿En el lugar de trabajo se percibe ruido de la calle o lugares cercanos que le impidan concentrarse?', options: yesNoOptions },
        { id: 'ii_ruido_alejado', text: '¿El espacio destinado al Teletrabajo está alejado del ruido o distracciones que interfieran con sus actividades?', options: yesNoOptions },
        { id: 'ii_ruido_aparatos', text: '¿Se percibe un volumen alto de aparatos de sonido como televisión, radio o música que le impidan concentrarse?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_agentes_mecanicos',
      title: 'Para agentes mecánicos',
      questions: [
        { id: 'ii_mecanicos_areas_separadas', text: '¿El área que destinó como lugar de trabajo está separada de otras áreas por elementos físicos?', options: yesNoOptions },
        { id: 'ii_mecanicos_superficie', text: '¿La superficie de su plano de trabajo le permite realizar sus actividades de Teletrabajo de forma adecuada?', options: yesNoOptions },
        { id: 'ii_mecanicos_soporte', text: '¿Dispone de un soporte para documentos impresos cuando los transcribe a los equipos TIC?', options: yesNoOptions },
        { id: 'ii_mecanicos_alcance', text: '¿Los elementos de uso más frecuente se encuentran a su alcance para evitar posturas forzadas?', options: yesNoOptions },
        { id: 'ii_mecanicos_pasillos', text: '¿Los pasillos del lugar de Teletrabajo se mantienen despejados para permitir su desplazamiento?', options: yesNoOptions },
        { id: 'ii_mecanicos_orden', text: '¿El lugar de trabajo permanece libre de basura, desorden y líquidos inflamables?', options: yesNoOptions },
        { id: 'ii_mecanicos_cables_camino', text: '¿Los cables que alimentan los equipos TIC se encuentran en el camino natural de paso?', options: yesNoOptions },
        { id: 'ii_mecanicos_esquinas', text: '¿Existe mobiliario con esquinas o bordes que puedan ocasionar golpes o cortaduras?', options: yesNoOptions },
        { id: 'ii_mecanicos_directorio', text: '¿Cuenta con un directorio telefónico de números de emergencia cerca de su lugar de trabajo?', options: yesNoOptions },
        { id: 'ii_mecanicos_contactos', text: '¿Dispone de instalaciones eléctricas para conectar los equipos TIC?', options: yesNoOptions },
        { id: 'ii_mecanicos_multicontacto', text: '¿Utiliza multicontactos para conectar el equipo TIC?', options: yesNoOptions },
        { id: 'ii_mecanicos_cables_condicion', text: '¿Las instalaciones eléctricas presentan cables en malas condiciones como rotos o sin cubierta?', options: yesNoOptions },
        { id: 'ii_mecanicos_distancia_contacto', text: '¿Los equipos se conectan a un contacto eléctrico a más de un metro de distancia?', options: yesNoOptions },
        { id: 'ii_mecanicos_tierra', text: '¿El contacto eléctrico que alimenta al equipo TIC cuenta con conexión a tierra física?', options: yesNoOptions },
        { id: 'ii_mecanicos_apaga_equipo', text: '¿Cuando no usa el equipo de Teletrabajo lo mantiene apagado o en modo de espera?', options: yesNoOptions },
        { id: 'ii_mecanicos_regulador', text: '¿Cuenta con un regulador contra sobretensiones eléctricas para proteger el equipo TIC?', options: yesNoOptions },
        { id: 'ii_mecanicos_olores', text: '¿Percibe olores de sustancias químicas, solventes, humo de cigarro o polvos de aserrín en su lugar de Teletrabajo?', options: yesNoOptions },
        { id: 'ii_mecanicos_fuma', text: '¿Usted o alguien más fuma dentro del lugar destinado para Teletrabajo?', options: yesNoOptions },
        { id: 'ii_mecanicos_libre_humo', text: '¿El lugar de trabajo está ubicado en un ambiente libre de humo?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_ergonomia',
      title: 'Para factores de riesgo ergonómico',
      questions: [
        { id: 'ii_ergonomia_altura_mesa', text: '¿La mesa, escritorio o superficie tiene una altura entre 72 cm y 76 cm?', options: yesNoOptions },
        { id: 'ii_ergonomia_silla_ruedas', text: '¿La silla que utiliza cuenta con cinco ruedas?', options: yesNoOptions },
        { id: 'ii_ergonomia_ajuste_altura', text: '¿Es posible ajustar la altura del asiento de su silla con respecto al piso?', options: yesNoOptions },
        { id: 'ii_ergonomia_descanso_pies', text: '¿Ajusta la silla para descansar completamente las plantas de los pies en el piso?', options: yesNoOptions },
        { id: 'ii_ergonomia_respaldo_apoyo', text: '¿Su espalda queda completamente apoyada en el respaldo de la silla?', options: yesNoOptions },
        { id: 'ii_ergonomia_respaldo_ajuste', text: '¿Es posible ajustar el respaldo de su silla para apoyar completamente la espalda?', options: yesNoOptions },
        { id: 'ii_ergonomia_curva_lumbar', text: '¿El respaldo de la silla soporta la curva lumbar de la espalda?', options: yesNoOptions },
        { id: 'ii_ergonomia_descansabrazos', text: '¿La silla cuenta con descansabrazos?', options: yesNoOptions },
        { id: 'ii_ergonomia_descansabrazos_ajuste', text: 'En caso de tener descansabrazos, ¿éstos son ajustables?', options: yesNoOptions },
        { id: 'ii_ergonomia_reposapies', text: '¿Necesita un reposapiés para apoyar las plantas de los pies?', options: yesNoOptions },
        { id: 'ii_ergonomia_apoyo_lumbar', text: '¿Considera que requiere un apoyo lumbar adicional en la silla del lugar de trabajo?', options: yesNoOptions },
        { id: 'ii_ergonomia_posturas_prolongadas', text: '¿Permanece sentado sin movimiento por más de 60 minutos continuos al trabajar con TIC?', options: yesNoOptions },
        { id: 'ii_ergonomia_espacio_adaptado', text: '¿El lugar de trabajo se adapta al espacio físico, equipo y material relacionado con el Teletrabajo?', options: yesNoOptions },
        { id: 'ii_ergonomia_brilhantez', text: '¿La brillantez de los equipos TIC le fatiga la vista?', options: yesNoOptions },
        { id: 'ii_ergonomia_distancia_monitor', text: '¿La distancia entre el monitor y su cara se encuentra entre 30 cm y 50 cm?', options: yesNoOptions },
        { id: 'ii_ergonomia_mouse', text: '¿Cuenta con un ratón o mouse para el equipo TIC?', options: yesNoOptions },
        { id: 'ii_ergonomia_distancia_teclado', text: '¿La distancia entre el teclado y los codos es insuficiente y le incomoda al teclear?', options: yesNoOptions },
        { id: 'ii_ergonomia_espacio_movimientos', text: '¿El lugar de trabajo es amplio para realizar movimientos sin posturas forzadas?', options: yesNoOptions },
        { id: 'ii_ergonomia_espacio_piernas', text: '¿Tiene suficiente espacio debajo de la mesa para evitar golpear sus piernas?', options: yesNoOptions },
        { id: 'ii_ergonomia_descanso_brazos', text: '¿Hay espacio para descansar los brazos cuando no teclea?', options: yesNoOptions }
      ]
    },
    {
      id: 'ii_psicosocial',
      title: 'Para factores de riesgo psicosocial',
      questions: [
        { id: 'ii_psicosocial_inconvenientes', text: 'Al realizar Teletrabajo, ¿tiene inconvenientes para desarrollarlo sin afectar actividades de la familia?', options: yesNoOptions },
        { id: 'ii_psicosocial_ciclos_descanso', text: '¿Conoce sobre los ciclos de descanso de acuerdo con su actividad en el Teletrabajo?', options: yesNoOptions },
        { id: 'ii_psicosocial_ansiedad', text: '¿Considera que el Teletrabajo le genera ansiedad, irritabilidad, estados depresivos o fatiga mental?', options: yesNoOptions }
      ]
    }
  ]
}

export const questionnaireSections = [sectionI, sectionII]

