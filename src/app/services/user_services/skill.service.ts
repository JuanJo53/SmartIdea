import { Injectable } from '@angular/core';
import {Skill} from "../../models/skill.model";
import apiKey from "../apiKey";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Skill[]>('http://localhost:8080/skills/userskills/1');
  }
  postnewskill(skill: Skill) {
    return this.http.post('http://localhost:8080/skills/userSkill/1', skill);
  }
  delete( idskill: number, skill: Skill){
    return this.http.put(`http://localhost:8080/skills/userSkill/${idskill}`,skill);
  }
  updateskill( idskill: number, skill: Skill){
    return this.http.put(`http://localhost:8080/skills/userSkill/update/${idskill}`,skill);
  }
}
