import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: Mapboxgl.Map;
  userLocation!: [number, number];
  searchResults: any[] = []; // Inicializa como un arreglo vacío
  markers: Mapboxgl.Marker[] = [];
  originMarker!: Mapboxgl.Marker;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = [position.coords.longitude, position.coords.latitude];
          this.map.flyTo({
            center: this.userLocation,
            zoom: 16
          });
          this.createOriginMarker(this.userLocation[0], this.userLocation[1], "Mi ubicación");
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      console.error('Geolocation no es soportado por este navegador.');
    }
  }

  initializeMap(): void {
    this.map = new Mapboxgl.Map({
      accessToken: environment.mapbox_key, 
      container: 'map-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.7611979, 45.3516034],
      zoom: 16.6
    });
  }

  createOriginMarker(lng: number, lat: number, popupText: string): void {
    if (this.originMarker) {
      this.originMarker.remove();
    }

    this.originMarker = new Mapboxgl.Marker({ color: 'red', draggable: false })
      .setLngLat([lng, lat])
      .setPopup(new Mapboxgl.Popup().setText(popupText))
      .addTo(this.map);

    this.markers.push(this.originMarker);
  }

  createMarker(lng: number, lat: number, popupText: string): void {
    const marker = new Mapboxgl.Marker({ draggable: false })
      .setLngLat([lng, lat])
      .setPopup(new Mapboxgl.Popup().setText(popupText))
      .addTo(this.map);

    this.markers.push(marker);
  }

  clearMarkers(): void {
    this.markers.forEach(marker => {
      if (marker !== this.originMarker) {
        marker.remove();
      }
    });
    this.markers = [this.originMarker];
  }

  returnToUserLocation(): void {
    if (this.userLocation) {
      this.map.flyTo({
        center: this.userLocation,
        zoom: 16
      });
    }
  }

  searchLocation(): void {
    const query = this.searchInput.nativeElement.value;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.mapbox_key}`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos de la búsqueda:', data); // Agrega un console.log para depuración
        if (data.features && data.features.length > 0) {
          this.searchResults = data.features;
          this.clearMarkers();
          this.displaySearchResults(this.searchResults);
        } else {
          console.error('No se encontraron resultados.');
        }
      })
      .catch(error => console.error('Error en la búsqueda:', error));
  }

  displaySearchResults(features: any[]): void {
    features.forEach(feature => {
      const [lng, lat] = feature.center || [0, 0];
      this.createMarker(lng, lat, feature.place_name || "Sin nombre");
    });

    const bboxes = features.map(feature => feature.bbox).filter(bbox => bbox);
    if (bboxes.length > 0) {
      this.fitBounds(bboxes);
    } else {
      const bounds = new Mapboxgl.LngLatBounds();
      features.forEach(feature => {
        if (feature.center) {
          bounds.extend(feature.center);
        }
      });
      this.map.fitBounds(bounds, { padding: 20 });
    }
  }

  fitBounds(bboxes: any[]): void {
    const bounds = new Mapboxgl.LngLatBounds();
    bboxes.forEach(bbox => {
      if (bbox) {
        bounds.extend([bbox[0], bbox[1]]);
        bounds.extend([bbox[2], bbox[3]]);
      }
    });
    this.map.fitBounds(bounds, { padding: 20 });
  }

  getDirections(destination: [number, number]): void {
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${this.userLocation[0]},${this.userLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${environment.mapbox_key}`)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry;
        this.addRouteToMap(route);
        // Cerrar el overlay de búsqueda al seleccionar una opción
        this.searchResults = [];
      })
      .catch(error => console.error('Error al obtener direcciones:', error));
  }

  addRouteToMap(route: any): void {
    if (this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: route
      }
    });

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
}
