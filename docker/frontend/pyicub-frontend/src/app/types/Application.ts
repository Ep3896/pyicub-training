import {Plugin} from "./Plugin";
import {BehaviorSubject, filter, map} from "rxjs";
import {FSM} from "./FSM";
import {ApplicationArgType} from "./ApplicationArgType";
import {ApplicationArgsTemplate} from "./ApplicationArgsTemplate";


type ApplicationArgs = {[key:string]:any};

export class Application{

  robotName:string
  name:string
  url:URL
  description:string
  args:ApplicationArgs = {};
  argsTemplate:ApplicationArgsTemplate = {}
  isConfigured = false;

  private readonly _isLoading = new BehaviorSubject<boolean>(true)
  readonly isLoading$ = this._isLoading.asObservable();

  get isLoading():boolean{
    return this._isLoading.getValue();
  }
  private set isLoading(val:boolean){
    this._isLoading.next(val);
  }

  private readonly _plugins = new BehaviorSubject<Plugin[]>([])
  readonly plugins$ = this._plugins.asObservable();
  readonly enabledPlugins$ = this.plugins$.pipe(
    map(plugins => plugins.filter(plugin => plugin.enabled))
  )
  get plugins():Plugin[]{
    return this._plugins.getValue();
  }
  private set plugins(val:Plugin[]){
    this._plugins.next(val);
  }

  togglePlugin(plugin:Plugin){
    let newPlugins = this.plugins.map(newPlugin => {
      if(plugin.name == newPlugin.name){
        newPlugin.togglePlugin()
        return newPlugin
      }
      return newPlugin
    })
    this.plugins = newPlugins;
  }

  constructor(robotName:string,name:string,url:string,description:string = "",plugins:Plugin[] = []) {
    this.robotName = robotName;
    this.name = name;
    this.url = new URL(url);
    this.description = description;
    this.plugins = plugins;
  }

}

