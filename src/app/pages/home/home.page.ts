import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapControlOptions, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps';

declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map') mapElement: any;
  private loading: any;
  private map: GoogleMap;
  public search: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  private originMarker: Marker;
  public destination:any;
  private googleDirectionsService = new google.maps.DirectionsService();

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;

    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.loadMap();
  }

  async loadMap(){
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...'});
    await this.loading.present();

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDSqz0aDS6Xa5XAHxs8OUMaDka-us-osvw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDSqz0aDS6Xa5XAHxs8OUMaDka-us-osvw'
    });

    const mapOptions: GoogleMapControlOptions = {
      controls:{
        zoom: false
      }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);

    try{
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOriginMarker();
    }catch(error) {
      console.error(error);
    }
  }

  async addOriginMarker(){
    try{
      const myLocation: MyLocation = await this.map.getMyLocation();
      
      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom:18
      });

      
      //aqui coloca o icone na origem
      this.originMarker = this.map.addMarkerSync({
       title:'Origin',
       icon:'#000',
       animation: GoogleMapsAnimation.DROP,
        position:myLocation.latLng
      })

    }catch(error){
      console.error(error);
    }finally{
      this.loading.dismiss();

    }
  }

  //pesquisa na barra
  searchChanged(){
    if(!this.search.trim().length) return;
  
    this.googleAutocomplete.getPlacePredictions({input: this.search}, predictions =>{
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });
  }
//calcula a rota adiciona a linha e o marcador
  async calcRoute(item: any){
    this.search = '';
    this.destination = item;
    
    const info:any = await Geocoder.geocode({address: this.destination.description});

    let markerDestination: Marker =  this.map.addMarkerSync({
      title: this.destination.description,
      icon: '#000',
      animation: GoogleMapsAnimation.DROP,
      position: info[0].position
    });

    this.googleDirectionsService.route({
      origin: this.originMarker.getPosition(),
        destination: markerDestination.getPosition(),
        travelMode:'DRIVING'
    }, async results=> {

      console.log(results)
      const points = new Array<ILatLng>();
      
      const routes = results.routes[0].overview_path;

      for (let i = 0; i <  routes.length; i++){
        points[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }
      await this.map.addPolyline({
        points:points,
        color: '#000',
        width: 3
      });

      this.map.moveCamera({ target: points });
    });
  }

}
