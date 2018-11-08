using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CreateUnitScript : MonoBehaviour {

	// Use this for initialization
	public Transform unitTransform;
	public float spawnTime = 20f;
	public Vector3 startPosition = new Vector3(-30f, -8f, 0f); 
		
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		spawnTime -=Time.deltaTime;
		if(spawnTime <= 0)
		{
			spawnTime = Random.Range(15f, 30f);
			var unit = Instantiate(unitTransform) as Transform;
			unit.position = startPosition;
		}
	}
}
