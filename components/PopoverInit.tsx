'use client';

import { useEffect } from 'react';

export default function PopoverInit() {
  useEffect(() => {
    let popoverInstances: any[] = [];

    const initBootstrapPopovers = () => {
      try {
        // 🤫 Diciamo a TypeScript di ignorare la riga successiva, così non genera errori
        // @ts-ignore
        const bootstrapModule = (window as any).bootstrap;
        
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        
        popoverInstances = Array.from(popoverTriggerList).map((el) => {
          const instance = new bootstrapModule.Popover(el, {
            trigger: 'click',
            html: false,
          });

          // Evento ufficiale di Bootstrap per chiudere i duplicati
          el.addEventListener('show.bs.popover', () => {
            popoverInstances.forEach((otherInstance) => {
              if (otherInstance !== instance) {
                otherInstance.hide();
              }
            });
          });

          return instance;
        });
      } catch (error) {
        console.error("Errore nell'inizializzazione dei Popover di Bootstrap:", error);
      }
    };

    initBootstrapPopovers();

    return () => {
      popoverInstances.forEach((instance) => {
        if (typeof instance.dispose === 'function') {
          instance.dispose();
        }
      });
    };
  }, []);

  return null;
}